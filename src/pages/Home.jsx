import ProductForm from "../components/ProductForm";

function Home() {
return ( 

    <div className="page"> 
    <section className="hero"> 
    <h1>Welcome to ProductHub</h1> 
    <p>Add your products and manage them in one place.</p> 
    </section>


  <ProductForm />
</div>


);
}

export default Home;
