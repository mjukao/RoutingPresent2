<?php

namespace App\Http\Controllers;
use Inertia\Inertia; //ใส้Inertia
use Illuminate\Http\Request;
//สร้าง php artisan make:controller ProductController -rm
class ProductController extends Controller
{
    private $products = [
        ['id' => 1, 'name' => 'PUMA FUTURE 7 ULTIMATE Goalkeeper FG/AG', 'description' => 'ผู้เล่นคนสำคัญทั้งหลาย มาก้าวสู่อนาคตอย่างมั่นคงกันเถอะ', 'price' => 4600, 'image' => '/images/AG.jpg'],
        ['id' => 2, 'name' => 'FUTURE 7 ULTIMATE BNA FG/AG', 'description' => 'จะเร็วแค่ไหนกัน คาดเข็มขัดนิรภัยเลย รองเท้ารุ่นนี้โดดเด่นด้วยพื้นรองเท้าชั้นนอก SPEEDSYSTEM แบบใหม่ล่าสุดที่ผสานกับสตั๊ดแบบ FastTrax เพื่อให้รองเท้าฟุตบอลคู่นี้พาคุณล้ำห...', 'price' => 15800, 'image' => '/images/hhh.jpg'],
        ['id' => 3, 'name' => 'FUTURE 7 PLAY FG/AG', 'description' => 'สุดหนึบเพื่อการยึดเกาะหลายทิศทาง ให้คุณวาดลวดลายได้อย่างโดดเด่นทั้งในสนาม', 'price' => 2500, 'image' => '/images/hhyhh.jpg'],
        ['id' => 4, 'name' => ' ULTRA ULTIMATE RUSH FG/AG', 'description' => 'การยึดเกาะและการควบคุมได้ ดังนั้นจึงเป็นสิ่งสำคัญ', 'price' => 6800, 'image' => '/images/jjijjj.jpg'],
        ['id' => 5, 'name' => 'PUMA x NEYMAR JR FUTURE 7 ULTIMATE FG/AG', 'description' => 'พื้นรองเท้าที่เหมาะกับรูปแบบของสนามที่คุณลงเล่น ', 'price' => 7900, 'image' => '/images/llkl.jpg'],
        ['id' => 6, 'name' => 'NIKE ZOOM MERCURIAL SUPERFLY 9 ELITE MDS FG', 'description' => 'โชว์ฟอร์มสุดเจ๋งได้เสมอ', 'price' => 11990, 'image' => '/images/lloll.jpg'],
        ['id' => 7, 'name' => 'Nike Mercurial Vapor 16 ', 'description' => 'ออกแบบเชิงโครงสร้างมาเพื่อช่วยให้นักฟุตบอลโฟกัสไปที่การโชว์ฟอร์มด้านที่ตัวเองถนัดได้ แล้วคุณล่ะเล่นสไตล์ไหน', 'price' => 9200, 'image' => '/images/nik.jpg'],
        ['id' => 8, 'name' => 'Nike Phantom GX 2 Elite', 'description' => 'พร้อมตอบโจทย์ มาในทรงคลาสสิกที่รังสรรค์ขึ้นจากหนัง ลงตัวสุดๆ สำหรับผู้เล่นที่บงการเกมอย่างมีคลาส', 'price' => 8900, 'image' => '/images/pan.jpg'],
        ['id' => 9, 'name' => 'Puma FUTURE 7 PRO', 'description' => 'รังสรรค์มาเพื่อผู้เล่นที่จับทางได้ยาก แพรวพราวด้วยการใช้ความคิดสร้างสรรค์ สัญชาตญาณ และสเต็ปเท้าระดับเทพ', 'price' => 9000, 'image' => '/images/ssa.jpg'],
        ['id' => 10, 'name' => 'Nike Mercurial Superfly 9 Elite', 'description' => 'ความเร็ว สปีดต้น และพละกำลัง Mercurial ให้คุณเล่นด้วยความไวได้เต็มขั้น', 'price' => 12900, 'image' => '/images/zz.jpg'],
    ];

    public function index()
    {
        // ฟอร์แมตราคาให้มีลูกน้ำ
    $products = collect($this->products)->map(function ($product) {
        $product['price'] = number_format($product['price']); // ฟอร์แมตราคาให้มีลูกน้ำ
        return $product;
    });

    // ส่งข้อมูลไปยัง Inertia
    return Inertia::render('Products/Index', [
        'products' => $products,  // ส่ง $products ที่มีการฟอร์แมตแล้ว
    ]);


        //return Inertia::render('Products/Index', ['products' => $this->products]);  //use Inertia\Inertia; จำเป็น
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = collect($this->products)->firstWhere('id', $id);

        if (!$product) {
            abort(404, 'Product not found');
        }

        return Inertia::render('Products/Show', ['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
