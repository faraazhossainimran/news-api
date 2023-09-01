const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");
  console.log(data.data.news_category);
  data.data.news_category.slice(0, 3).forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a class="tab" onclick="handleLoadNews('${category.category_id}')">${category.category_name}</a>
        `;
    tabContainer.appendChild(div);
  });
};

const handleLoadNews = async (categoryID) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryID}`
  );
  const data = await response.json();
  console.log(data.data);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHtml = " ";
  data.data?.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img src=${news?.image_url} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${news?.title.slice(0, 40)}
          <div class="badge badge-secondary p-5">${news.rating.badge}</div>
          </h2>
          <p>${news.details.slice(0, 50)}</p>
          <h5>Total views: ${
            news.total_view ? news.total_view : "no views"
          }</h5>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" onclick="handleModal('${news._id}')">Details</button>
          </div>
        </div>
      </div>
    `;
    cardContainer.appendChild(div);
  });
};

const handleModal = async (newsID) => {
    const response = await fetch (`https://openapi.programming-hero.com/api/news/${newsID}`)
    const data = await response.json();
    console.log(data.data[0]);

  const modalContainer = document.getElementById("modal-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <!-- Open the modal using ID.showModal() method -->
<button class="btn" onclick="my_modal_1.showModal()">open modal</button>
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
    `;
modalContainer.appendChild(div);
const modal = document.getElementById('my_modal_1');
modal.showModal();
};
handleCategory();
handleLoadNews("01");
