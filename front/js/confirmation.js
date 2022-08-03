const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
//Numéro de confirmation du panier
//Fonction pour récupérer l'identifiant de la commande
function numberConfirm() {
    const order = document.getElementById('orderId');
    order.innerHTML = id;
}
numberConfirm(); 
 