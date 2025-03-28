import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Pagination = ({ currentPage, totalPages, baseUrl }) => {
  const navigate = useNavigate();

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    navigate(`${baseUrl}${newPage}`);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={getPageRangeDisplayed()}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1}
        containerClassName={"pagination-container"}
        pageClassName={"pagination-item"}
        pageLinkClassName={"pagination-link"}
        previousClassName={"pagination-item"}
        previousLinkClassName={"pagination-prev-next"}
        nextClassName={"pagination-item"}
        nextLinkClassName={"pagination-prev-next"}
        breakClassName={"pagination-item"}
        breakLinkClassName={"pagination-link"}
        activeClassName={"pagination-item-active"}
        activeLinkClassName={"pagination-active"}
        disabledClassName={"pagination-disabled"}
      />
    </div>
  );
};

export default Pagination;
