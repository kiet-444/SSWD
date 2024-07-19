import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from "../../../components/Header/Header";
import Welcome from "../../../components/Homepage/welcome";
import Trending from "../../../components/Homepage/trending";
import New from "../../../components/Homepage/new";
import Favor from "../../../components/Homepage/favor";
import Category from "../../../components/Homepage/category";
import Footer from "../../../components/Footer/footer";
import { BsFire } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";
import { responsive } from "../../../components/Homepage/CarouselRespon";

import axios from "axios";
import React, { useEffect, useState } from "react";
// import { newData } from './newdata';
// import { favorData } from './favordata';
// import { categoryData } from './categorydata';

function Favorite() {
    const [favoritebooks, setfavoriteBooks] = useState([]);

    const displayedfavoriteBooks = favoritebooks;

    const email = localStorage.getItem("userEmail");
    console.log("email", email);
    const readerID = localStorage.getItem("userID");
    console.log("ID", readerID);

    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        axios
            .get(`http://localhost:3001/books/favorite/${readerID}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                console.log("Favor:", res.data);
                setfavoriteBooks(res.data);
            })
            .catch((err) => {
                // console.error(err);
            });
    }, []);

    const favoriteData = displayedfavoriteBooks.map((book) => (
        <Favor
            key={book.ISBN}
            ISBN={book.ISBN}
            title={book.title}
            authorName={book.authorName}
            coverLink={book.coverLink}
        />
    ));

    return (
        <>
            <div className="container">
                {!email ? (<></>) : (
                    <>
                        {displayedfavoriteBooks.length === 0 ? (<></>) : (
                            <>
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        color: "#02598B",
                                        fontSize: 50,
                                        fontFamily: "Inter",
                                        fontWeight: "400",
                                        wordWrap: "break-word",
                                        paddingBottom: "30px",
                                        paddingTop: "100px",
                                    }}
                                >
                                    Danh mục ưa thích
                                </div>
                                <Carousel responsive={responsive}>{favoriteData}</Carousel>
                            </>)}
                    </>)}
            </div>
        </>
    );
}

export default Favorite;
