let colors;
fetch("https://random-flat-colors.vercel.app/api/random?count=5")
.then(res => res.json())
.then(data => {
    colors = data.colors;
    function createColorElement(color){
        let colorElement = document.createElement('div');
        colorElement.style.backgroundColor = color;
        colorElement.style.borderRadius = '50%';
        colorElement.style.display = 'inline-block';
        colorElement.style.height = '15px';
        colorElement.style.width = '15px';
        colorElement.style.marginRight = '5px';
        return colorElement;
    }
    let colorSearchElement = document.getElementById('colorSearch');
    let colorSelectElement = document.getElementById('selectColor');
    colors.map(color => {
        let colorElement = createColorElement(color);
        colorSearchElement.appendChild(colorElement);
    })

    colors.map(color => {
        let colorElement = createColorElement(color);
        let colorSelector = document.createElement('div');
        let radioElement = document.createElement('input');
        radioElement.name = 'color';
        radioElement.value = color;
        radioElement.type = 'radio';
        let labelElement = document.createElement('label');
        labelElement.for = 'color';
        labelElement.append(colorElement);
        colorSelector.append(radioElement);
        colorSelector.append(labelElement);
        colorSelectElement.appendChild(colorSelector);
    })

    let numberOfCards = 0;
    let titles = [];
    let subTitles = [];
    let cards = [];
    let addCreativeButton = document.getElementById('addCreativeButton');
    let progrssBar = document.getElementById('progressBar');
    let form = document.getElementById('form');
    let formCloseButton = document.getElementById('close');
    let formDoneButton = document.getElementById('done');

    const setCards = function(){
        let filter = document.getElementById('titleSearch').value;
        let searchedCards = cards.filter(card => card.title.indexOf(filter) > -1 || card.subTitle.indexOf(filter) > -1);
        GenerateCardsView(searchedCards);
    };
    let debouncing = function(fn, d){
        let timer;
        return function(){
            clearTimeout(timer);
            timer = setTimeout( () => {
                fn();
            }, d);
        };
    };
    document.getElementById('titleSearch').onkeyup = debouncing(setCards, 1000);

    function GenerateCardsView(cards){
        let addCreativeClass = document.getElementById('creativeCards');
        addCreativeClass.innerHTML = '';
        cards.map(card => {
            let creative = document.createElement('div');
            creative.style.height = '100px';
            creative.style.width = '200px';
            creative.style.backgroundColor = card.selectedColor;
            creative.style.padding = '25px';
            creative.style.margin = '25px';

            let title = document.createElement('div');
            title.textContent = card.title; document.getElementById('enterTitle').value;
            creative.appendChild(title);

            let subTitle = document.createElement('div');
            subTitle.textContent = card.subTitle; document.getElementById('enterSubTitle').value;
            
            creative.appendChild(subTitle);


            addCreativeClass.appendChild(creative);
        })
    }

    formDoneButton.onclick = () => {
        
        let title = document.getElementById('enterTitle').value;
        let subtitle = document.getElementById('enterSubTitle').value;
        let colors = document.getElementsByName('color');
        let selectedColor;
        
        for(i = 0; i < colors.length; i++) {
            if(colors[i].checked){
                selectedColor = colors[i].value;
            }
        }
        if( title === '' || subtitle === '' || selectedColor == undefined){
            return;
        }
        titles.push(title);
        subTitles.push(subtitle);
        cards.push({title: title, subTitle: subtitle, selectedColor: selectedColor});

        GenerateCardsView(cards);

        document.getElementById('enterTitle').value = '';
        document.getElementById('enterSubTitle').value = '';

        form.style.display = 'none';
        
        numberOfCards = numberOfCards + 1;
        progrssBar.value = numberOfCards*20;
        if(progrssBar.value < 100){
            addCreativeButton.disabled = false;
        }

    }
    formCloseButton.onclick = () => {
        form.style.display = 'none';
        addCreativeButton.disabled = false;
    }
    if(progrssBar.value < 100){
        addCreativeButton.disabled = false;
        addCreativeButton.onclick =  () => {
            addCreativeButton.disabled = true;
            form.style.display = 'flex';
        };
    }
})
.catch(err => console.log(err));

