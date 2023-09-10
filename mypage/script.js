let allElements = Object.values(document.querySelectorAll('*'));
let exceptions = new Set(Object.values(document.querySelectorAll('#projects .item video')));
const defaultDisplays = new Map();
for (let element of allElements) {
    defaultDisplays.set(element, window.getComputedStyle(element).display);
}
let filterElements = Object.values(document.querySelectorAll('.CS, .AI, .Web, .GUI, .NA'));
let count = new Map();
for (let element of filterElements) {
    count.set(element, 0);
}
let sections = Object.values(document.querySelectorAll('.section'));
let buttons = Object.values(document.querySelectorAll('button'));

let isPressed = {
    'All': true,
    'CS': true,
    'AI': true,
    'Web': true,
    'GUI': true,
};

toggleAll(true);
updateDisplay();

function toggleButton(arg) {
    if (arg === 'All') {
        toggleAll(true);
    }
    else {
        if (isPressed['All']) {
            toggleAll(false);
        }
        isPressed[arg] = !isPressed[arg];
        var argElements = Array.from(filterElements).filter(function(element) {
            return element.classList.contains(arg);
        });
        for (let element of argElements) {
            if (isPressed[arg]) {
                count.set(element, count.get(element) + 1);
            }
            else {
                count.set(element, count.get(element) - 1);
            }
        }
        if (!isPressed[arg]) {
            flag = true;
            for (const value of Object.values(isPressed)) {
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
    updateDisplay();
}

function toggleAll(val) {
    isPressed['All'] = val;
    for (key in isPressed) {
        isPressed[key] = val;
    }
    for (let element of filterElements) {
        if (val) {
            let classes = Object.values(element.classList).filter(value => Object.keys(isPressed).includes(value));
            count.set(element, classes.length);
        }
        else {
            count.set(element, 0);
        }
    }
}

function updateDisplay() {
    updateButtonStyle();
    for (let element of allElements) {
        if (!exceptions.has(element)) {
            element.style.display = defaultDisplays.get(element);
        }
    }
    if (!isPressed['All']) {
        for (let element of filterElements) {
            if (count.get(element) === 0) {
                element.style.display = 'none';
            }
        }
        updateEducationDisplay();
        updateSkillsDisplay();
        updateProjectsDisplay();
        updateAwardsDisplay();
        updateCertificationsDisplay();
        updateLanguagesDisplay();
        updateNavigationDisplay();
    }
}

function updateButtonStyle() {
    for (let key in isPressed) {
        let val = isPressed[key];
        var button = Array.from(buttons).filter(function(element) {
            return element.id === key + '-button';
        })[0];
        if (key === 'All') {
            if (val) {
                button.style.backgroundColor = 'rgb(30, 30, 30)';
            }
            else {
                button.style.backgroundColor = 'rgb(37, 37, 37)';
            }
        }
        else {
            if (val && !isPressed['All']) {
                button.style.backgroundColor = 'rgb(30, 30, 30)';
            }
            else {
                button.style.backgroundColor = 'rgb(37, 37, 37)';
            }
        }
    }
}

function updateDisplayGeneric(sectionID) {
    let sectionFlag = true;
    let items = Object.values(document.querySelectorAll('#' + sectionID + ' .item'));
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (item.style.display !== 'none') {
            sectionFlag = false;
            break;
        }
    }
    if (sectionFlag) {
        Array.from(sections).filter(function(element) {
            return element.id === sectionID;
        })[0].style.display = 'none';
    }
}

function updateEducationDisplay() {
    let sectionFlag = true;
    let eduItems = Object.values(document.querySelectorAll('#education .item'));
    for (let i = 0; i < eduItems.length; i++) {
        let courses = Object.values(eduItems[i].querySelectorAll('span'));
        let flag = true;
        for (let j = 0; j < courses.length; j++) {
            if (courses[j].style.display !== 'none') {
                sectionFlag = false;
                flag = false;
                eduItems[i].style.display = defaultDisplays.get(eduItems[i]);
                break;
            }
        }
        if (flag) {
            eduItems[i].style.display = 'none';
        }
    }
    if (sectionFlag) {
        Array.from(sections).filter(function(element) {
            return element.id === 'education';
        })[0].style.display = 'none';
    }
}

function updateSkillsDisplay() {
    let sectionFlag = true;
    let skillItems = Object.values(document.querySelectorAll('#skills .item'));
    for (let i = 0; i < skillItems.length; i++) {
        let skillComponents = Object.values(skillItems[i].querySelectorAll('.skill-component'));
        let flag0 = true;
        for (let j = 0; j < skillComponents.length; j++) {
            let units = Object.values(skillComponents[j].querySelectorAll('span'));
            let flag1 = true;
            for (let unit of units) {
                if (unit.style.display !== 'none') {
                    flag1 = false;
                    flag0 = false;
                    sectionFlag = false;
                    skillComponents[j].style.display = defaultDisplays.get(skillComponents[j]);
                    skillItems[i].style.display = defaultDisplays.get(skillItems[i]);
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
    if (sectionFlag) {
        Array.from(sections).filter(function(element) {
            return element.id === 'skills';
        })[0].style.display = 'none';
    }
}

function updateProjectsDisplay() {
    updateDisplayGeneric('projects');
}

function updateAwardsDisplay() {
    updateDisplayGeneric('awards');
}

function updateCertificationsDisplay() {
    updateDisplayGeneric('certifications');
}

function updateLanguagesDisplay() {
    updateDisplayGeneric('languages');
}

function updateNavigationDisplay() {
    for (let section of sections) {
        let navElement = document.querySelector("a[href='#" + section.id + "']").parentElement;
        if (section.style.display !== 'none') {
            navElement.style.display = defaultDisplays.get(navElement);
        }
        else {
            navElement.style.display = 'none';
        }
    }
}

function toggleDemo(arg) {
    console.log("entered");
    let demo = document.getElementById(arg);
    console.log(demo);
    if (window.getComputedStyle(demo).display !== "none") {
        demo.pause();
        demo.style.display = "none";
    }
    else {
        demo.style.display = "block";
    }
}