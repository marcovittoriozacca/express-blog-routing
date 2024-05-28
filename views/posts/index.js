module.exports = (req, postsList, showLink) => {
    return {
        content: `
        <div class="container mx-auto py-5">
            <ul>
                ${postsList.map(p => `
                <li>
                    <a class="flex flex-col gap-y-5" href="${showLink(req, p.title)}">
                        <h2 class="text-3xl font-semibold text-blue-500">${p.title}</h2>
                        <p>${p.content}</p>
                        <figure class="w-52 rounded-md overflow-hidden">
                            <img class="w-full h-auto" src="./imgs/posts/${p.image}" alt="${p.title}">
                        </figure>
                        <div>
                            ${p.tags.map(tag => `<span class="odd:text-blue-400 even:text-rose-400">${tag}</span>`).join(' - ')}
                        </div>
                    </a>
                </li>
                `).join('')}
            </ul>
        </div>`
    };
};