
function AppBar() {
    return (
        <nav className='grid items-start gap-2'>            
            <span
                className={'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground'}
            >
                <span>Estoque</span>
            </span>
        </nav>
    );
}

export default AppBar;
