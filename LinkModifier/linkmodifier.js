	
//partneroldalak tömbje <--ezt lehet bővíteni (http:// nélkül!)
var partners = [
	"index.hu",
	"jofogas.hu"
];
		
//kampány neve <-- meg kell megadni
var campaign = "pelda";
		
modifyHref = function(element, checkString){
	var base = element.getAttribute("href");
	if(base == null){
		res = "http://" +  checkString + "/?utm_campaign=" + campaign;
	}else{
		var res = base.substr(0,base.lastIndexOf(checkString)+checkString.length) + "/?utm_campaign=" + campaign;
	}
	element.setAttribute("href", res);
}
	
window.addEventListener("load", function(){
	var nodes = document.body.querySelectorAll("*");
	var lastFound = -1;
	var links = document.links;
	var anchorText;
	var link;
			
	for(var i = 0; i<partners.length; i++){				
		for( var j = 0;j<links.length; j++){
			if(links[j].getAttribute("href").match(partners[i])){
				links[j].addEventListener("click", modifyHref(links[j],partners[i]));
			}
		}
	}
			
	for(var idx = 0;idx<partners.length;idx++){
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].innerText.match(partners[idx])){
				lastFound = i;
			}
		}
		if(lastFound != -1){
			anchorText =  nodes[lastFound].innerText;
			nodes[lastFound].innerText = null;
			nodes[lastFound].innerHTML = "<a id=" + "partnerLink" + idx + ">"+anchorText+"</a>";
			link = document.getElementById("partnerLink" + idx);
			modifyHref(link,partners[idx]);
		}
		lastFound = -1;
	}		
});