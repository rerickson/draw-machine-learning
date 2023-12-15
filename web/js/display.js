function createRow(container, studentName, samples){
    const row = document.createElement('div');
    row.classList.add("row");

    container.appendChild(row);

    const rowLabel = document.createElement("div");
    rowLabel.innerHTML = studentName;
    rowLabel.classList.add("rowLabel");
    row.appendChild(rowLabel);

    for(let sample of samples){
        const {id, label, student_id, correct} = sample;

        const sampleContainer = document.createElement("div");
        sampleContainer.id = "sample_" + id;
        sampleContainer.classList.add("sampleContainer");
        if(correct){
            sampleContainer.style.backgroundColor = "lightgreen";
        }
        sampleContainer.onclick = () => handleClick(sample, false);

        const sampleLabel = document.createElement("div");
        sampleLabel.innerHTML = label;
        sampleContainer.appendChild(sampleLabel);

        const img = document.createElement("img");

        img.src = constants.IMG_DIR + "/" + id + ".png";
        img.classList.add("thumb");
        if(utils.flaggedUsers.includes(student_id)){
            img.classList.add("blur");
        }
        sampleContainer.appendChild(img);
        row.appendChild(sampleContainer);
    }

}

function handleClick(sample, scrollIntoView = true){
    [...document.querySelectorAll(".emphasize")].forEach((e)=>{
        e.classList.remove('emphasize')
    });

    if(sample==null){
        return;
    }
    const el = document.getElementById("sample_" + sample.id);
    el.classList.add("emphasize");

    if(scrollIntoView){
        el.scrollIntoView({
            behavior: 'auto',
            block: "center"
        });
    }
    chart.selectSample(sample);
}

function toggleInput(){
    if(inputContainer.style.display == "none"){
        inputContainer.style.display = "block";
        sketchPad.triggerUpdate();
    } else {
        inputContainer.style.display = "none";
        chart.hideDynamicPoint();
    }
}