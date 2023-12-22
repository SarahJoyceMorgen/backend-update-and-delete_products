import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import Comments from "../Comments";
import ProductForm from "../ProductForm";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(id ? `/api/products/${id}` : null);

  async function handleEditProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      mutate();
    }
  }

  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error(response.status);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <h1>Product not found</h1>;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
      <button type="button" onClick={handleDeleteProduct}>
        Delete
      </button>
      <button type="button" onClick={handleEditProduct}>
        Edit
      </button>
      <ProductForm onSubmit={handleEditProduct} isEditMode heading="Edit Fish" />
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
const Product = () => {const Product = () => {
  <button type="button" onClick={() => setIsEditMode(!isEditMode)}>
    {isEditMode ? "Cancel Edit" : "Edit"}
  </button>
  {isEditMode && (
    <ProductForm onSubmit={handleEditProduct} isEditMode heading="Edit Fish" />
  )}
};
  <button type="button" onClick={() => setIsEditMode(!isEditMode)}>
    {isEditMode ? "Cancel Edit" : "Edit"}
  </button>
  {isEditMode && (
    <ProductForm onSubmit={handleEditProduct} isEditMode heading="Edit Fish" />
  )}
};