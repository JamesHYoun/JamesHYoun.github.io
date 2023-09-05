let visibility = {
    'All': true,
    'CS': true,
    'AI': true,
    'Web': true,
    'GUI': true,
};

// let items = Object.values(document.querySelectorAll('.AI, .CS, #certifications .item, #languages .item'));
let items = Object.values(document.querySelectorAll('.CS, .AI, .Web, .GUI, .item, #education .item span, #skills .item span'));
let sections = Object.values(document.querySelectorAll('.section'));

let count = new Map();

toggleAll(true);

function toggleButton(arg) {
    if (arg === 'All') {
        toggleAll(true);
    }
    else {
        if (visibility['All']) {
            toggleAll(false);
        }
        visibility[arg] = !visibility[arg];
        const argItems = Object.values(document.querySelectorAll('.' + arg));
        for (let item of argItems) {
            if (visibility[arg]) {
                count.set(item, count.get(item) + 1);
            }
            else {
                count.set(item, count.get(item) - 1);
            }
        }
        if (!visibility[arg]) {
            flag = true;
            for (const value of Object.values(visibility)) {
                if (value === true) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                toggleAll(true);
            }
        }
    }
    updateVisibility();
}

function toggleAll(val) {
    visibility['All'] = val;
    for (key in visibility) {
        visibility[key] = val;
    }
    for (let item of items) {
        if (val) {
            let classes = Object.values(item.classList).filter(value => Object.keys(visibility).includes(value));
            count.set(item, classes.length);
        }
        else {
            count.set(item, 0);
        }
    }
}

function updateVisibility() {
    if (visibility['All']) {
        let contentElements = document.getElementById('content').querySelectorAll('*');
        contentElements.forEach(element => {
            element.style.display = 'block';
        });
        for (let item of items) {
            if (item.tagName === 'SPAN') {
                item.style.display = 'inline';
            }
            else {
                item.style.display = 'block';
            }
        }
    }
    else {
        // let felements = Object.values(document.querySelectorAll('.' + arg));
        for (let item of items) {
            if (count.get(item) > 0) {
                if (item.tagName === 'SPAN') {
                    item.style.display = 'inline';
                }
                else {
                    item.style.display = 'block';
                }
            }
            else {
                item.style.display = 'none';
            }
        }
    }
    updateEducationVisibility();
    updateSkillsVisibility();
    for (let section of sections) {
        let sectionItems = Object.values(document.querySelectorAll('#' + section.id + ' .item'));
        flag = true;
        let navElement = document.querySelector("a[href='#" + section.id + "']");
        for (let item of sectionItems) {
            if (item.style.display !== 'none') {
                flag = false;
                section.style.display = 'block';
                navElement.style.display = 'block';
                navElement.parentElement.style.listStyleType = 'disc';
                break;
            }
        }
        if (flag) {
            section.style.display = 'none';
            navElement.style.display = 'none';
            navElement.parentElement.style.listStyleType = 'none';
        }
    }
    updateButtonStyle();
}

function updateEducationVisibility() {
    let eduItems = Object.values(document.querySelectorAll('#education .item'));
    for (let i = 1; i < eduItems.length - 1; i++) {
        let courses = Object.values(document.querySelectorAll('#education .item:nth-child(' + (i + 1) + ') span'));
        let flag = true;
        for (let j = 0; j < courses.length; j++) {
            if (courses[j].style.display !== 'none') {
                flag = false;
                eduItems[i].style.display = 'block';
                break;
            }
        }
        if (flag) {
            eduItems[i].style.display = 'none';
        }
    }
}

function updateSkillsVisibility() {
    let skillItems = Object.values(document.querySelectorAll('#skills .item'));
    for (let i = 0; i < skillItems.length; i++) {
        let skillComponents = Object.values(document.querySelectorAll('#skills .item:nth-child(' + (i + 1) + ') .skill-component'));
        let flag0 = true;
        for (let j = 0; j < skillComponents.length; j++) {
            let units = Object.values(document.querySelectorAll('#skills .item:nth-child(' + (i + 1) + ') .skill-component:nth-child(' + (j + 1) + ') span'));
            let flag1 = true;
            for (let unit of units) {
                if (unit.style.display !== 'none') {
                    flag1 = false;
                    flag0 = false;
                    skillComponents[j].style.display = 'block';
                    skillItems[i].style.display = 'block';
                    break;
                }
            }
            if (flag1) {
                skillComponents[j].style.display = 'none';
            }
        }
        if (flag0) {
            skillItems[i].style.display = 'none';
        }
    }
}

function updateButtonStyle() {
    for (let key in visibility) {
        let val = visibility[key];
        let button = document.getElementById(key + "-button");
        if (key === 'All') {
            if (val) {
                button.style.backgroundColor = 'rgb(30, 30, 30)';
            }
            else {
                button.style.backgroundColor = 'rgb(37, 37, 37)';
            }
        }
        else {
            if (val && !visibility['All']) {
                button.style.backgroundColor = 'rgb(30, 30, 30)';
            }
            else {
                button.style.backgroundColor = 'rgb(37, 37, 37)';
            }
        }
    }
    // let buttons = document.querySelectorAll('button');
    // for (let button of buttons) {
    //     if (button.id === 'All-button')
    //     if (button.id in visibility) {
    //         targetElement.style.backgroundColor = 'rgb(50, 50, 50)';
    //     }
    //     else {
    //         targetElement.style.backgroundColor = 'rgb(37, 37, 37)';
    //     }
    // }
}
