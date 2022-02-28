/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
// query selector groups all the sections in a 'nodeList' data strucure which is iterable
const sections = document.querySelectorAll("section");

// query selector to select the nav bar which we will append the sections to
const navList = document.querySelector("#navbar__list");

// fragment to append the elements to it before appending them to the DOM to prevent reflow and repainting
const aFragment = document.createDocumentFragment();

//top Button
topButton = document.getElementById("topButton");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// a funtions to create a the nav list .. 
const createNav = (sections, fragment, list) => {
    //iterate through each section
    sections.forEach(section => {
        // create li element which will be appended to the ul element later
        let listItem = document.createElement("li");

        // create an anchor element to link each nav item with the related section
        let aLink = document.createElement("a");

        // the link will have the related section name
        aLink.textContent = section.getAttribute("data-nav");

        // set class for styling
        aLink.setAttribute("class", "menu__link");

        // create an event listener to make the link scroll the ralated section on click
        aLink.addEventListener("click", () => {
            section.scrollIntoView({ behavior: "smooth" });
        })

        // each nav item will be a link to the linked section
        listItem.appendChild(aLink);

        // append all the links to fragement to improve preformance
        fragment.appendChild(listItem);
    });
    // after finishing, append all links in the fragment to the nav list 
    list.appendChild(fragment);
};

const activeSection = () => {
    window.addEventListener("scroll", () => {
        //iterate through sections list
        sections.forEach(sec => {
            // object contains the smallest rectangle which contain the entire element
            const rect = sec.getBoundingClientRect();
            
            // if the rectangle top hits this condition this means that the current section is the active one.
            if (rect.top > 0 && rect.top < sec.clientHeight) {

                // make it the active section if it is not
                if (!sec.classList.contains("active")) {
                    sec.classList.add("active");
                }
            }
            else {
            
                // other sections should not have active class in their class list
                // only one active class a time
                if (sec.classList.contains("active")) {
                    sec.classList.remove("active");
                }
            }
        });
    });
};


 const scroll = () => {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// Scroll to top onClick
const topFunction = () => {
    // For Safari
    document.body.scrollTop = 0;

    // For Chrome, Firefox, IE and Opera
    document.documentElement.scrollTop = 0; 
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// invoke the createNav function to create a nav bar containing links to each section of the page.
createNav(sections, aFragment, navList);

// Add class 'active' to section when near top of viewport
activeSection();



// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () => {
    scroll()
};



/**
 * End Main Functions
 *
 * 
*/


