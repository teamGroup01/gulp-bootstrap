// $(function () {
//     // JS
//     var video = document.querySelector('video'),
//         container = document.querySelector('#m-video');

//     function getOS() {
//         var ua = window.navigator.userAgent.toLowerCase(),
//             iPhone = /iphone/i.test(ua) ? true : false,
//             android = /android/i.test(ua) ? true : false;

//         return {
//             android: android,
//             iPhone: iPhone
//         };
//     }

//     if (getOS().android) {
//         //alert('android');
//     } else if (getOS().iPhone) {
//         //alert('android');
//     } else {
//         video.src = 'https://daqianduan_16.coding.me/Hello-world/1.mp4';

//     }
//     var setVideoDimensions = function () {
//         var w = video.videoWidth,
//             h = video.videoHeight;

//         var videoRatio = (w / h).toFixed(2);

//         var containerStyles = window.getComputedStyle(container),
//             minW = parseInt(containerStyles.getPropertyValue('width')),
//             minH = parseInt(containerStyles.getPropertyValue('height'));

//         var widthRatio = minW / w,
//             heightRatio = minH / h;

//         if (widthRatio > heightRatio) {
//             var newWidth = minW;
//             var newHeight = Math.ceil(newWidth / videoRatio);
//         } else {
//             var newHeight = minH;
//             var newWidth = Math.ceil(newHeight * videoRatio);
//         }

//         video.style.width = newWidth + 'px';
//         video.style.height = newHeight + 'px';
//     }
//     video.addEventListener('loadedmetadata', setVideoDimensions, false);
//     window.addEventListener('resize', setVideoDimensions, false);
//     video.addEventListener('canplay', function () {
//         document.getElementById('video_cover').style.display = 'none';
//     })
// })