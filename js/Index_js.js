let
    name = document.getElementById("productName"),
    desc = document.getElementById("productDesc"), 
    price = document.getElementById("productPrice"),
    company = document.getElementById("productCom"),
    btn = document.getElementById("myBtn"),
    productsRow = document.getElementById("productsRow") ,
    productContainer ,
    search = document.getElementById("search") ;

    if (localStorage.getItem("productContainer") == null )
    {
        productContainer = []
    }
    else 
    {
        productContainer = JSON.parse(localStorage.getItem("productContainer"))
        displayData() ;
    }
btn.onclick = function ()
{
    addProduct() ;
    displayData() ;
  //  clearForm() ;
}
function addProduct() 
{
    // to add the product at the loal storage 
    if ( name.value == "" || price.value == "" || desc.value == "" || company == ""  )
    {
        window.alert("please enter a valid information ")
    }
    else 
    {
        let product = 
        {
            price : price.value ,
            name : name.value ,
            company : company.value ,
            desc : desc.value , 
        }
        productContainer.push(product) ;
        localStorage.setItem ( "productContainer" , JSON.stringify(productContainer));
    }
}
function displayData ()
{
    // to show the data at the document 
    var cols = "" ;
    for (let i = 0 ; i < productContainer.length ; i++ )
    {
        cols += `<div class = "col-md-6 col-lg-3 text-center p-3 "><h2 class = " text-primary"> ${productContainer[i].name}</h2>
         <p class = "text-secondary p-2 ">${productContainer[i].desc} </p>
         <p class = "text-danger">${productContainer[i].price}</p>
         <p class = "text-muted">${productContainer[i].company} </p>
         <button class = "btn btn-danger " onclick = "delProduct(${i})"> Delete </button> </div> `
         console.log(productContainer[i].price ) ;
    }

    document.getElementById("productsRow").innerHTML = cols ;
}
function delProduct (i)
{
    productContainer.splice(i,1 ) ;
    localStorage.setItem("productContainer" , JSON.stringify(productContainer)) ;
    displayData() ;
}
function clearForm ()
{
    let inps = document.getElementsByClassName("form-control")
    for (let i = 0 ; i < inps.length ; i++ )
    {
        inps[i].value = "" ;
    }
}
search.onkeyup = function()
{
    productSearch( search.value)
}
function productSearch(term)
{
    let result = "";
    for(let i = 0 ; i < productContainer.length ; i++ )
    {
        if ( productContainer[i].name.includes(term))
        {

            result += `<div class = "col-md-6 col-lg-3 text-center p-3  "><h2 class = " text-primary"> ${productContainer[i].name}</h2>
            <p class = "text-secondary p-2 ">${productContainer[i].desc} </p>
            <p class = "text-danger">${productContainer[i].price}</p>
            <p class = "text-muted">${productContainer[i].company} </p>
            <button class = "btn btn-danger " onclick = "delProduct(${i})"> Delete </button> </div>`
        }
        else 
        {
            result = '<p class = "text-danger py-2"> this item is not found ......</p>  '
        }
    }
    document.getElementById("result").innerHTML = result 
}
