import "./styles.css";

// Menu data structure
var menuLinks = [
    { text: "about", href: "/about" },
    {
        text: "catalog",
        href: "#",
        subLinks: [
            { text: "all", href: "/catalog/all" },
            { text: "top selling", href: "/catalog/top" },
            { text: "search", href: "/catalog/search" },
        ],
    },
    {
        text: "orders",
        href: "#",
        subLinks: [
            { text: "new", href: "/orders/new" },
            { text: "pending", href: "/orders/pending" },
            { text: "history", href: "/orders/history" },
        ],
    },
    {
        text: "account",
        href: "#",
        subLinks: [
            { text: "profile", href: "/account/profile" },
            { text: "sign out", href: "/account/signout" },
        ],
    },
];

const topMenuEl = document.getElementById("top-menu");

menuLinks.forEach((link) => {
    const aElement = document.createElement("a");
    aElement.href = link.href;
    aElement.textContent = link.text;
    topMenuEl.appendChild(aElement);
});

const topMenuLinks = topMenuEl.querySelectorAll("a");

const mainEl = document.querySelector("main");
mainEl.style.setProperty("background-color", "var(--main-bg)");
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");
mainEl.style.height = "100vh";

topMenuEl.style.setProperty("background-color", "var(--top-menu-bg)");
topMenuEl.classList.add("flex-around");
topMenuEl.style.height = "100%";

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.setProperty("background-color", "var(--sub-menu-bg)");
subMenuEl.classList.add("flex-around");
subMenuEl.style.height = "100%";
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

let activeLinkId = null;

function createSubMenuLinks(subLinks) {
    subLinks.forEach((subLink) => {
        const subLinkElement = document.createElement("a");
        subLinkElement.textContent = subLink.text;
        subLinkElement.href = subLink.href;
        subMenuEl.appendChild(subLinkElement);
    });
}

topMenuEl.addEventListener("click", function (event) {
    event.preventDefault();
    if (!event.target.matches("a")) return;
    console.log(event.target.textContent);

    const clickedLink = event.target;
    const clickedLinkIndex = Array.from(topMenuLinks).indexOf(clickedLink);
    const link = menuLinks[clickedLinkIndex];

    const isActive = clickedLink.classList.contains("active");

    topMenuLinks.forEach((link) => {
        link.classList.remove("active");
    });

    if (activeLinkId !== link.text || !isActive) {
        subMenuEl.innerHTML = "";
    }

    if (!isActive) {
        clickedLink.classList.add("active");
        activeLinkId = link.text;
    } else {
        activeLinkId = null;
    }

    if (link.subLinks && (activeLinkId === link.text || !isActive)) {
        createSubMenuLinks(link.subLinks);
        subMenuEl.style.top = "100%";
    } else {
        subMenuEl.style.top = "0";
    }
});

subMenuEl.addEventListener("click", function (event) {
    event.preventDefault();

    if (!event.target.matches("a")) return;
    console.log(event.target.textContent);

    const clickedLinkText = event.target.textContext?.trim();

    subMenuEl.style.top = "0";

    topMenuLinks.forEach((link) => {
        link.classList.remove("active");
    });

    if (clickedLinkText) {
        mainEl.innerHTML = `<h1>${clickedLinkText}</h1>`;
    }
});

