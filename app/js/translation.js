define(function (require, exports, module) {
    var nlp=require('./nlp_compromise');

    function randomInt(max)
    {
        return Math.floor((Math.random() * max));
    }

    function createPadding(the, frontSpace,backSpace)
    {
        the=the==undefined?true:the;
        frontSpace=frontSpace==undefined?true:frontSpace;
        backSpace=backSpace==undefined?true:backSpace;
        var fluff=[
            'of',
            'of',
            'with',
            'for',
            'and'

        ]
        var result=' '+fluff[randomInt(fluff.length)];
        if (the) {
            result+=' the';
        }
        result+=' ';
        return result;
    }

    function translate(text)
    {
        var terms=nlp.text(text).terms();
        var subject=null;//;nlp.text(text).nouns()[0];//(terms[0].tag=='Person'||terms[0].tag=='Noun')&&terms[0].normal!='i'?terms[0].text:'';
        var verb=null;
        var tensePhrase='';
        var theRest='';

        for (var i = 0; i < terms.length; i++) {
            var term = terms[i];
            if(verb!=null)
            {
                if(theRest!=''||!term.pos.Preposition)
                {
                    if(term.tag=='Adjective'||term.tag=='Adverb')
                    {
                        if(i+1<terms.length)
                        {
                            theRest+=' '+terms[i+1].text+createPadding()+term.text;
                            i++;
                        }
                        else
                        {
                            theRest+=createPadding()+term.text;
                        }
                    }
                    else
                    {
                        theRest+=' '+term.text;
                    }
                }
            }
            if(term.pos.Noun&&subject==null)
            {
                subject=term;
                subject=subject.normal=='i'?'':subject.text;
                if(i-1>-1&&(terms[i-1].tag=='Adjective'||terms[i-1].tag=='Adverb'))
                {
                    subject+=createPadding(true,subject!='',false)+terms[i-1].text;
                }
            }
            else
            {
                if(term.pos.Verb&&verb==null)
                {
                    tensePhrase=term.conjugation();
                    verb=term.text;
                    if(tensePhrase=='Gerund')
                    {
                        var split=verb.split(' ');
                        if(split.length>1)
                        {
                            verb=split[split.length-1];
                            tensePhrase=term.normal.includes('was')?'PastTense':
                                        term.normal.includes('am')?'Infinitive':
                                        'FutureTense'
                        }
                    }
                }
            }
        }
        if(subject==null)
        {
            subject='';
        }
        var isGerund=nlp.verb(verb).conjugation()=='Gerund';
        var conjugations=nlp.verb(verb).conjugate();
        console.log(conjugations);
        verb=isGerund?conjugations['infinitive']:conjugations['gerund'];
        
        switch(tensePhrase)
        {
            case 'PastTense':
                tensePhrase='Wasing ';
                break;
            case 'Infinitive':
                tensePhrase='Ising ';
                break;
            case 'FutureTense':
                tensePhrase='Willing ';
                break;
        }
        if(subject!='')
        {
            subject=createPadding()+subject;
        }
        verb=createPadding()+verb;
        if (theRest!='') {
            theRest=createPadding(false)+theRest;
        }
        return tensePhrase+subject+verb+theRest;
    }

    module.exports = translate;
});