export const $ = (selector: string) => new Selector(document.querySelector(selector) as HTMLElement);

export class Selector<T extends HTMLElement> {
    constructor(public element: T) {}
    css(property: string, value?: string) {
        if (value === undefined) {
            return getComputedStyle(this.element).getPropertyValue(property);
        }
        this.element.style.setProperty(property, value);
        return "";
    }
    addClass(className: string) {
        this.element.classList.add(className);
    }
    removeClass(className: string) {
        this.element.classList.remove(className);
    }
    hasClass(className: string) {
        return this.element.classList.contains(className);
    }
    toggleClass(className: string) {
        this.element.classList.toggle(className);
    }
    attr(attributeName: string, value?: string) {
        if (value === undefined) {
            return this.element.getAttribute(attributeName);
        } 
        this.element.setAttribute(attributeName, value);
        return "";
    }
    on(event: string, handler: EventListener) {
        this.element.addEventListener(event, handler);
    }
    html(content: string) {
        this.element.innerHTML = content;
    }
    text(content: string) {
        this.element.textContent = content;
    }
}