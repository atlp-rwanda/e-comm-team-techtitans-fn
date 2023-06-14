import PropTypes from "prop-types";
import { useTable, usePagination } from "react-table";

const ReusableTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    gotoPage, // Added gotoPage method
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const goToPage = (pageNum) => {
    gotoPage(pageNum); // Call gotoPage method with the desired page number
  };

  return (
    <div className="Table-container">
      <table {...getTableProps()} className="table-content">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td key={cell.column.id} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <div className="pagination-pages">
          {pageOptions.map((pageNum) => (
            <button
              key={pageNum}
              className={`pagination-page ${
                pageNum === pageIndex ? "active" : ""
              }`}
              onClick={() => goToPage(pageNum)}
            >
              {pageNum + 1}
            </button>
          ))}
        </div>
        <button
          className="pagination-button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  // Other prop types declarations
};

export default ReusableTable;
