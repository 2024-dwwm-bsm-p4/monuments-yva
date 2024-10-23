document.addEventListener('DOMContentLoaded', () => {
    console.log("hello");

    const startDiv = document.querySelector('.start');
    const contentDivs = document.querySelectorAll('.btn-hide');
    console.log(contentDivs, "et", startDiv);

    // Ajouter l'événement de clic à la div "start"
    startDiv.addEventListener('click', () => {
        console.log("clicked");

        // Parcourir tous les éléments avec la classe "div-card"
        contentDivs.forEach(contentDiv => {
            console.log(contentDiv);
            
            // Utiliser une ternaire pour basculer entre display: none et display: block
            contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
        });
    });
});
