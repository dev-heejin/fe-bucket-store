export default function Navigation() {
    return <nav
        className="hidden lg:flex lg:flex-col lg:gap-[100px] sticky top-[90px] left-0 w-[250px] bg-gray-200 h-[calc(100vh-90px)] p-4 z-40">
        <ul className="space-y-2">
            {['메뉴1', '메뉴2', '메뉴3', '메뉴4'].map((item) => (
                <li key={item} className="font-bold text-lg">
                    {item}
                </li>
            ))}
        </ul>
        <ul className="space-y-2">
            {['메뉴1', '메뉴2', '메뉴3', '메뉴4'].map((item) => (
                <li key={item} className="font-bold text-lg">
                    {item}
                </li>
            ))}
        </ul>
    </nav>
}