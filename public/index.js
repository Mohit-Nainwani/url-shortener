function incrementClick(id){
    const click = id.parentElement.children[2];
    click.innerText = Number(click.innerText) + 1;
}