// from a nature paper URL, extract all methods
async function extractMethods(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();

        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');

        let methodsSection = doc.querySelector('section[data-title="Methods"]');
        let methodTitles = methodsSection.querySelectorAll('h3');

        let methods = Array.from(methodTitles).map((titleElement) => {
            let contentElements = [];
            let sibling = titleElement.nextElementSibling;

            while (sibling && sibling.tagName !== 'H3') {
                contentElements.push(sibling.outerHTML); 
                sibling = sibling.nextElementSibling;
            }

            return {
                title: titleElement.textContent,
                content: contentElements.join('\n') 
            };
        });

        return methods;
    } catch (err) {
        console.log('Methods fetching: Failed to fetch page: ', err);
    }
}

