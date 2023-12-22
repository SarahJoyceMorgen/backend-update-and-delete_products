import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  const { id } = request.query;

  if (request.method === "DELETE") {
    await Product.findByIdAndDelete(id);
    response.status(200).json({ status: "Product successfully deleted." });
  }
}
