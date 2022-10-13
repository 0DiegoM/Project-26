//https://teachablemachine.withgoogle.com/models/znK56WAKn/

prediccion1 = '';

Webcam.set ({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById('camera');

Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/znK56WAKn/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = 'La prediccion es'+prediccion1;
    var utterThis = new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis);
}

function Predecir() {
    img = document.getElementById('captured_image');
classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        prediccion1 = results[0].label;
        speak();

        if (results[0].label=="Bien") {
            document.getElementById("updateEmoji").innerHTML = '👍';
        } 
        if (results[0].label=="Perfecto") {
            document.getElementById("updateEmoji").innerHTML = '👌';
        } 
        if (results[0].label=="Victoria") {
            document.getElementById("updateEmoji").innerHTML = '✌️';
        } 
    }
    }

