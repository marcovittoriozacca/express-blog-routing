module.exports = (targetPost) => {
    return {
        content: `
        <div class="container mx-auto py-5">
            <div class="flex flex-col gap-y-5">
                <h1 class="text-3xl font-semibold text-blue-500">${targetPost.title}</h1>
                <p>${targetPost.content}</p>
                <figure class="w-52 rounded-md overflow-hidden">
                    <img class="w-full h-auto" width="200" src="/imgs/posts/${targetPost.image}" alt="${targetPost.title}">
                </figure>
                <div>
                    ${targetPost.tags.map(tag => `<span class="odd:text-blue-400 even:text-rose-400">${tag}</span>`).join(' - ')}
                </div>
            </div>
        </div>
        `
    }
}