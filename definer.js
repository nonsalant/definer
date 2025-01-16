const load = new URL(import.meta.url).searchParams.get('load');
const items = cleanItems(load.split(','));

items.forEach((item) => {
    const itemParts = item.split('|');
    const definedName = itemParts[1];
    let modulePath = itemParts[0];
    modulePath = addBasePath(modulePath);
    modulePath = addJsExtension(modulePath);
    modulePath = processPath(modulePath);
    const filename = extractFilename(modulePath);

    import(modulePath).then((module) => {
        // Dynamically access the class by its name
        const webComponentClassName = toPascalCase(filename);
        class WebComponent extends module[webComponentClassName] {
            // Modified from: https://til.jakelazaroff.com/html/define-a-custom-element/
            static tag = filename;
            static define(tag = this.tag) {
                this.tag = tag;
                const name = customElements.getName(this);
                if (name) {
                    return console.warn(`${this.name} already defined as <${name}>!`);
                }
                const ce = customElements.get(tag);
                if (Boolean(ce) && ce !== this) {
                    return console.warn(`<${tag}> already defined!`);
                }
                customElements.define(tag, this);
            }
            static {
                const tag = definedName || this.tag;
                if (tag !== 'false') this.define(tag);
            }
        }
    }).catch(err => { console.error(err); });

}); // end items.forEach()


// Helpers

function addBasePath(modulePath) {
    if (isExternal(modulePath)) {
        return modulePath; // don't add to external URLs
    }
    const basePath = new URL(import.meta.url).searchParams.get('base')?.trim();
    return basePath ? `${basePath}/${modulePath}` : modulePath;
}

// Function to compute the relative path between the current module 
// and the page calling it
function processPath(modulePath) {
    if (isExternal(modulePath)) {
        return modulePath; // don't process external URLs
    }
    // Get the directory paths of both the current module and the current page
    const moduleURL = new URL(import.meta.url);
    const currentPageURL = new URL(window.location.href);
    const fromPath = moduleURL.pathname.split('/').slice(0, -1).join('/');
    const toPath = currentPageURL.pathname.split('/').slice(0, -1).join('/');
    if (fromPath === toPath) {
        return `./${modulePath}`;
    }
    return `${toPath}/${modulePath}`;
}


// Utils

function cleanItems(arr) {
    return arr
        .map(item => item.trim())
        .filter(item => item); // Filter out empty strings
}

function isExternal(modulePath) {
    return modulePath.includes('://');
}

function toPascalCase(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

function extractFilename(filePath) {
    const withExtension = filePath.split('/').pop();
    return withExtension.replace('.js', '');
}

function addJsExtension(str) {
    return str.endsWith('.js') ? str : `${str}.js`;
}