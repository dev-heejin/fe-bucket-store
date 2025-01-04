import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: { params: { page: string } }) {
    const {searchParams} = new URL(request.url)
    const page = searchParams.get('page') || '1'

    console.log('=== DYNAMIC_PAGE === ', page)

    const url = `https://bucket-assignment-vercel.vercel.app/api?length=12&type=newest&category=25&page=${page}`;
    const response = await fetch(url);
    const data = await response.json()
    return NextResponse.json(data)
}