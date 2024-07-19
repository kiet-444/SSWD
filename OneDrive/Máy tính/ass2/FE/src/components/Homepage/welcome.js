import React from 'react';
import welcome1 from '../../assets/image/welcome1.png';
import welcome2 from '../../assets/image/welcome2.png';
import welcome3 from '../../assets/image/welcome3.png';
import welcome4 from '../../assets/image/welcome4.png';
class Welcome extends React.Component {
    render() {
        return (
            <>
                <div className="mt-4" style={{color: '#02598B', fontSize: 30, fontFamily: 'Inter', fontWeight: '400', textDecoration: 'underline', wordWrap: 'break-word', paddingBottom: '30px', textDecoration: "none"}}>Chào mừng đến với thư viện</div>
                
                <div className="container text-center">
                    <div className="row gap-3">
                        <div className="col d-flex align-items-center justify-content-center" style={{backgroundColor: '#F6EECA', width: '295px', height: '100px', position: 'relative', textAlign: 'center'}}>
                            <div className="d-flex align-items-center justify-content-center" style={{textAlign: 'left', fontSize: '0.9em'}}>
                                <img className="img-fluid" src={welcome1} alt="img" style={{float: 'left', paddingRight: '7%', paddingLeft: '5%', display: 'block', alignItems: 'center',  fontFamily: 'Work Sans'}}></img>
                                Mượn sách thư viện miễn phí trực tiếp
                            </div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center" style={{backgroundColor: '#F6EECA', width: '295px', height: '100px', position: 'relative', textAlign: 'center'}}>
                            <div className="d-flex align-items-center justify-content-center" style={{textAlign: 'left',  fontSize: '0.9em'}}>
                                <img className="img-fluid" src={welcome2} alt="img" style={{ float: 'left', paddingRight: '7%', paddingLeft: '5%', display: 'block', alignItems: 'center',  fontFamily: 'Work Sans'}}></img>
                                Theo dõi những cuốn sách bạn yêu thích
                            </div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center" style={{backgroundColor: '#F6EECA', width: '295px', height: '100px', position: 'relative', textAlign: 'center'}}>
                            <div className="d-flex align-items-center justify-content-center" style={{textAlign: 'left',  fontSize: '0.9em'}}>
                                <img className="img-fluid" src={welcome3} alt="img" style={{ float: 'left', paddingRight: '7%', paddingLeft: '5%', display: 'block', alignItems: 'center',  fontFamily: 'Work Sans'}}></img>
                                Tìm kiếm theo sở thích của bạn
                            </div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center" style={{backgroundColor: '#F6EECA', width: '295px', height: '100px', position: 'relative', textAlign: 'center'}}>
                            <div className="d-flex align-items-center justify-content-center" style={{textAlign: 'left',  fontSize: '0.9em'}}>
                                <img className="img-fluid" src={welcome4} alt="img" style={{ float: 'left', paddingRight: '7%', paddingLeft: '5%', display: 'block', alignItems: 'center',  fontFamily: 'Work Sans'}}></img>
                                Hãy gửi đề xuất sách cho chúng tôi
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Welcome;