interface MenuProps{
    setPage: React.Dispatch<React.SetStateAction<string>>
}

const Menu = (props: MenuProps) => {
    return(
        <div>
            <h2>Adicionar Produto</h2>
            <h2>Editar Produto</h2>
        </div>
    )
}

export default Menu;