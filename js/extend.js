const results = document.title.match('ActiveCollab');
if (!!results) {
    console.info("Active History Enabled");

    const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="438.536px" height="438.536px" viewBox="0 0 438.536 438.536" style="position: absolute;height: 20px;width: 20px;right: 20px;top: 20px;cursor: pointer;" xml:space="preserve" class="test">
<g>
\t<path d="M421.125,134.191c-11.608-27.03-27.217-50.347-46.819-69.949C354.7,44.639,331.384,29.033,304.353,17.42
\t\tC277.325,5.807,248.969,0.005,219.275,0.005c-27.978,0-55.052,5.277-81.227,15.843C111.879,26.412,88.61,41.305,68.243,60.531
\t\tl-37.12-36.835c-5.711-5.901-12.275-7.232-19.701-3.999C3.807,22.937,0,28.554,0,36.547v127.907c0,4.948,1.809,9.231,5.426,12.847
\t\tc3.619,3.617,7.902,5.426,12.85,5.426h127.907c7.996,0,13.61-3.807,16.846-11.421c3.234-7.423,1.903-13.988-3.999-19.701
\t\tl-39.115-39.398c13.328-12.563,28.553-22.222,45.683-28.98c17.131-6.757,35.021-10.138,53.675-10.138
\t\tc19.793,0,38.687,3.858,56.674,11.563c17.99,7.71,33.544,18.131,46.679,31.265c13.134,13.131,23.555,28.69,31.265,46.679
\t\tc7.703,17.987,11.56,36.875,11.56,56.674c0,19.798-3.856,38.686-11.56,56.672c-7.71,17.987-18.131,33.544-31.265,46.679
\t\tc-13.135,13.134-28.695,23.558-46.679,31.265c-17.987,7.707-36.881,11.561-56.674,11.561c-22.651,0-44.064-4.949-64.241-14.843
\t\tc-20.174-9.894-37.209-23.883-51.104-41.973c-1.331-1.902-3.521-3.046-6.567-3.429c-2.856,0-5.236,0.855-7.139,2.566
\t\tl-39.114,39.402c-1.521,1.53-2.33,3.478-2.426,5.853c-0.094,2.385,0.527,4.524,1.858,6.427
\t\tc20.749,25.125,45.871,44.587,75.373,58.382c29.502,13.798,60.625,20.701,93.362,20.701c29.694,0,58.05-5.808,85.078-17.416
\t\tc27.031-11.607,50.34-27.22,69.949-46.821c19.605-19.609,35.211-42.921,46.822-69.949s17.411-55.392,17.411-85.08
\t\tC438.536,189.569,432.732,161.22,421.125,134.191z"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g>
</g></svg>`;


    document.addEventListener('DOMSubtreeModified', function () {
        if (!document.getElementById('activeHistoryUndoButton')) {
            if (!!document.querySelector('.modal_container textarea')) {
                console.log('Added undo button to description box');
                let parentElement = document.querySelector('.modal_container textarea').parentElement;
                let descriptionElement = document.querySelector('.modal_container textarea');
                parentElement.style.cssText += "position:relative";
                let svgElement = document.createElement('svg');
                svgElement.innerHTML = svg;
                svgElement.id = 'activeHistoryUndoButton';
                svgElement.style.fill = '#dddddd'
                svgElement.style.display = 'none'
                svgElement.onmouseenter = function () {
                    this.style.fill = 'green';
                }
                svgElement.onmouseleave = function () {
                    this.style.fill = '#dddddd';
                }
                svgElement.onclick = function () {
                    if (!!getHistory()) {
                        descriptionElement.value = getHistory();
                        svgElement.style.display = 'none';
                    }
                }
                descriptionElement.addEventListener('change', saveTextAsHistory, false);
                descriptionElement.addEventListener('keyup', saveTextAsHistory, false);
                descriptionElement.addEventListener('paste', saveTextAsHistory, false);


                parentElement.appendChild(svgElement);

                if (!!getHistory() && getHistory().length !== 0 && descriptionElement.value.length === 0) {
                    svgElement.style.display = 'block'
                }
            }
        }
    });

    let saveTextAsHistory = function () {
        setTimeout(function () {
            let descriptionElement = document.querySelector('.modal_container textarea');
            let svgElement = document.getElementById('activeHistoryUndoButton');
            if (!!descriptionElement && !!svgElement) {
                if (!!getHistory() && getHistory().length !== 0 && descriptionElement.value.length === 0) {
                    svgElement.style.display = 'block';
                } else {
                    svgElement.style.display = 'none';
                }
                window.localStorage.setItem('activeHistory', descriptionElement.value);
            }
        }, 500);
    }

    function getHistory() {
        return window.localStorage.getItem('activeHistory');
    }


}
