define(function (require, exports, module) {
    var Context = require('samsara/dom/Context');
    var View = require('samsara/core/View');
    var Transform = require('samsara/core/Transform');
    var Surface = require('samsara/dom/Surface');
    var ContainerSurface = require('samsara/dom/ContainerSurface');
    var HeaderFooterLayout = require('samsara/layouts/HeaderFooterLayout');
    var translate = require('./translation');

    var headerHeight=100;
    var footerHeight=150;
    var header=new Surface({
        size: [undefined,headerHeight],
        content: 'HIGH IMPERIAL TRANSLATOR',
        properties: {
            textAlign:'center',
            verticalAlign:'middle',
            lineHeight:headerHeight+'px',
            fontSize:'60px',
            paddingRight:'30px',
            paddingLeft:'30px'
        }
    });
    var facebookDiv=document.getElementsByClassName('fb-like')[0];
    var facebookSurface=new Surface({
        size: [120,20],
        origin: [1,0.5],
        content: facebookDiv
    });

    var content=new View();

    var highImperialSurface=new Surface({
        size: [undefined,headerHeight],
        origin: [0.5,0.5],
        properties: {
            textAlign:'center',
            verticalAlign:'baseline',
            fontSize:'50px',
            paddingRight:'40px',
            paddingLeft:'40px'
        }
    });
    content
        .add({align:[0.5,0.5]})
        .add({transform:Transform.translate([0,-window.innerHeight/4])})
        .add(highImperialSurface);

    var textBox=document.createElement('input');
    textBox.inputType='text';
    textBox.setAttribute('style','width: 100%');
    var textBoxSurface=new Surface({
        size: [300,30],
        origin: [0.5,0.5],
        content: textBox
    });
    content
        .add({align:[0.5,0.5]})
        .add({transform:Transform.translate([0,0])})
        .add(textBoxSurface);

    var translateButton=new Surface({
        size: [250,50],
        origin: [0.5,0.5],
        content: 'Ising of the translating!',
        properties: {
            textAlign:'center',
            verticalAlign:'middle',
            lineHeight:50+'px',
            fontSize:'20px',
            background:'white',
            borderRadius:'20px'
        }
    });
    translateButton.on('click',function(){
        var english=textBox.value;
        highImperialSurface.setContent(translate(english));
    });
    content
        .add({align:[0.5,0.5]})
        .add({transform:Transform.translate([0,50])})
        .add(translateButton);

    var footer=new Surface({
        size: [undefined,footerHeight],
        content: 'By Richard Kopelow<br>'+
                 'This is super Alpha, needs much polish<br>'+
                 'NLP done with <a href="https://github.com/nlp-compromise/nlp_compromise">nlp_compromise</a><br>'+
                 'Layout powered by <a href="http://samsarajs.org/">SamsaraJS</a><br>'+
                 'Base project generated with <a href="https://github.com/richardkopelow/generator-samsara">generator-samsara</a><br>'+
                 'This is made by a fan made site, if you havn\'t read Mistborn by Brandon Sanderson you should.',
        properties: {
            textAlign:'right',
            fontSize:'15px',
            paddingBottom:'30px',
            paddingRight:'30px'
        }
    });

    var layout = new HeaderFooterLayout({
        header: header,
        footer: footer,
        content: content
    });

    // Create a Samsara Context as the root of the render tree
    var context = new Context();

    context
        .add(layout);
    
    context
        .add({
            align:[1,0],
            transform: Transform.translate([0,headerHeight/2,0])
        })
        .add(facebookSurface);

    

    // Mount the context to a DOM element
    context.mount(document.body);
});
