//Requête vers l'API pour récupérer l'objet contenant tous les produits et leurs caractèristiques

async function getArticle() {
    try {
        const response = await fetch("http://localhost:3000/api/products");
        // une reponse de la bonne réception du lien
        //console.log(response); 
        const getProduct = await response.json();
        // traduit en JSON : tableau contenant des objets
        //console.log(getProduct);
    
        
        const items = document.getElementById("items");
        //sélection élément contenant ID items
        
        for (i = 0; i < getProduct.length; i++) {
        //console.log(i); boucle fonctionne

            const hyperlien = document.createElement("a");
            const article = document.createElement("article");
            const image = document.createElement("img");
            const h3 = document.createElement("h3");
            const p = document.createElement("p");
            //création classe sur balise
    
            
            h3.classList.add("productName");
            p.classList.add("productDescription");

            items.append(hyperlien);
            hyperlien.append(article);
            article.append(image,h3,p);
            //Création des balises dans le HTMl dans une boucle contenant 8 produit

            hyperlien.href =`./product.html?id=${getProduct[i]._id} `
            
            //SOUCIS APPARAITRE LA SOURCE ET ALT
            image.alt = getProduct[i].altTxt;
            image.src = getProduct[i].imageURL;
            
            h3.classList.add("productName");
            h3.textContent = getProduct[i].altTxt;
            p.classList.add("productDescription");
            p.textContent = getProduct[i].description;
            //affichage des produits dans la page accueil
            
        }
    }
    catch (err) {
        alert("Le serveur ne répond pas");
        console.log(err);
    }
   
}

getArticle();