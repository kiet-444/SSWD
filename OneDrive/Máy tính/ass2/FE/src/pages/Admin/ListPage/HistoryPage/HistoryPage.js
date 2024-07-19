
import './HistoryPage.css';

function HistoryPage() {
  return (
    <>
      <div className="boxNoBorder">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb-history-page">
            <li className="breadcrumb-item"><a href="https://google.com" style={{ textDecorationLine: 'none', color: 'var(--product-normal)' }}><p>Trang chủ</p></a></li>
            <li className="breadcrumb-item"><a href="https://translate.google.com" style={{ textDecorationLine: 'none', color: 'var(--product-normal)' }}><span>Thông tin cá nhân</span></a></li>
            <li className="breadcrumb-item"><a href="https://youtube.com" style={{ textDecorationLine: 'none', color: 'var(--product-normal)' }}><span>Lịch sử</span></a></li>
            <li className="breadcrumb-item active" aria-current="page">Lịch sử mượn, trả sách</li>
          </ol>
        </nav>
        <div className="mb-5" style={{ textAlign: 'center' }}>
          <p className="title1"><strong>Lịch sử mượn, trả sách</strong></p>
        </div>
        <table className="table">
          <thead className="table-light-history-page">
            <tr>
              <td>IBSN</td>
              <td>| Tiêu đề</td>
              <td>| Tác giả</td>
              <td>| Hình thức</td>
              <td>| Ngày bắt đầu</td>
              <td>| Ngày trả sách</td>
              <td>| Trạng thái</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>29/10/2023</td>
              <td><span style={{ color: 'var(--green-normal)' }}>Đã hoàn thành</span></td>
            </tr>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>X</td>
              <td><span style={{ color: 'var(--green-normal)' }}>Đã hoàn thành</span></td>
            </tr>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>X</td>
              <td><span style={{ color: 'var(--yellow-normal)' }}>Đang mượn</span></td>
            </tr>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>29/10/2023</td>
              <td><span style={{ color: 'var(--yellow-normal)' }}>Đang mượn</span></td>
            </tr>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>29/10/2023</td>
              <td><span style={{ color: 'var(--green-normal)' }}>Đã hoàn thành</span></td>
            </tr>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>29/10/2023</td>
              <td><span style={{ color: 'var(--green-normal)' }}>Đã hoàn thành</span></td>
            </tr>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>29/10/2023</td>
              <td><span style={{ color: 'var(--green-normal)' }}>Đã hoàn thành</span></td>
            </tr>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>29/10/2023</td>
              <td><span style={{ color: 'var(--green-normal)' }}>Đã hoàn thành</span></td>
            </tr>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>29/10/2023</td>
              <td><span style={{ color: 'var(--green-normal)' }}>Đã hoàn thành</span></td>
            </tr>
            <tr>
              <td>0-545-01022-5</td>
              <td>Giáo trình giải tích 2</td>
              <td>Nhà xuất bản giáo dục Việt Nam</td>
              <td>Mượn sách</td>
              <td>21/10/2023</td>
              <td>29/10/2023</td>
              <td><span style={{ color: 'var(--green-normal)' }}>Đã hoàn thành</span></td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="...">
          <ul className="pagination" style={{ justifyContent: 'center' }}>
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item active" aria-current="page">
              <span className="page-link">1</span>
            </li>
            <li className="page-item">
              <a className="page-link" href="https://google.com">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="https://translate.google.com">3</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="https://youtube.com">4</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="https://getbootstrap.com">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default HistoryPage;
