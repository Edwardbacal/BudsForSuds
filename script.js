const app = {};
app.apiUrl = 'https://api.punkapi.com/v2/beers/?';

app.getBeers = function(food){
    $.ajax({
        url: app.apiUrl,
        method:'GET',
        datatype:'json',
        data: {
            key: app.apiUrl, 
            format: 'json',
            food:app.foodName
        }
    })
        .then(function (response) {
            if (response.length > 0) {
                app.displayBeers(response);
                $(".asideContainer").show();
            }
            else {
                $(".asideContainer").addClass('beerDescription').append(`<p>Sorry, there were no matches found, please try again</p>`)
                $(`.asideContainer`).show();
            }
        }).fail(function (error) {
            $(`.asideContainer`).css('padding', '0')
        })
}  

app.displayBeers = function(Array){
    Array.forEach(function(beerSelection){
        if(beerSelection.image_url){
            const beerName = $('<h4>').addClass('beerName').text(beerSelection.name);
            const beerDescription = $('<p>').addClass('beerDescription').text(beerSelection.description);
                const pairing = $('<p>Food Pairings:<p>').addClass('pairingTitle')
                const beerFood = $('<p>').addClass('beerFood').text(beerSelection.food_pairing);
                const beerImage = $('<img>').addClass('beerImage').attr('src',beerSelection.image_url);
                const beerFrame = $('<div>').addClass('beerFrame').append(beerName,beerDescription, pairing, beerFood);
                const beerFrame2 = $('<div>').addClass('beerFrame2').append(beerImage)
                const beerContainer = $('<div>').addClass('beerContainer').append(beerFrame,beerFrame2)
                $(`.asideContainer`).css('padding', '20px')
                $(`.asideContainer`).append(beerContainer);
            }       
        });
};

app.init = function(){
    $('#textInput').on('submit',function(){
        event.preventDefault();
        $('.asideContainer').empty();
        app.foodName = $('input').val();
        app.getBeers();
        $(`input`).val('');
        $("html, body").animate({
            scrollTop: $(".asideContainer").offset().top
    }, 600);

    })
   $('#foodOption').on('click', function(){
        event.preventDefault();
        $('.asideContainer').empty();
        app.foodName = $('input').val();
        app.getBeers();
        $(`input`).val('');
       $("html, body").animate({
           scrollTop: $(".asideContainer").offset().top
       }, 600);
    });
};

$(document).ready(function(){
    app.init();
})

