import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useState, useRef, useEffect } from "react";

const Forms = ({ onBookAdded, editBook, setEditBook, handleClose }) => {
  const fileInputRef = useRef(null);

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // upload file image

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    console.log("Selected Image:", file);

    if (file instanceof File) {
      setSelectedImage(file);
      setFieldValue("image", file);
    } else {
      console.error("Invalid file format or no file selected.");
    }
  };

  const [isEditMode, setIsEditMode] = useState(!!editBook);

  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
    setIsEditMode(!!editBook);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleShowSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = (resetForm) => {
    setShowSuccessModal(false);
    resetForm();
  };

  const prepareDataForBackend = (values) => {
    const updatedValues = { ...values }; // Tạo một bản sao của values để không làm thay đổi giá trị gốc

    if (!Array.isArray(updatedValues.genres)) {
      // Nếu genres không phải là mảng, đặt giá trị mặc định là một mảng chứa giá trị đó
      updatedValues.genres = updatedValues.genres ? [updatedValues.genres] : [];
    }
    console.log("Updated Values:", updatedValues);
    return updatedValues;
  };
  const handleFormSubmit = async (values, resetForm) => {
    try {
      if (formData) {
        const updatedValues = prepareDataForBackend(values);
        // values.genres = Array.isArray(values.genres) ? values.genres : [values.genres];
        console.log([...formData]);

        const apiUrl = editBook
          ? `http://localhost:3001/books`
          : "http://localhost:3001/books";

        const method = editBook ? "PUT" : "POST";

        const updatedFormData = new FormData();

        // Append từng trường và giá trị vào FormData
        Object.entries(updatedValues).forEach(([key, value]) => {
          if (key === "image" && value instanceof File) {
            // Đối với trường image, nếu là File thì thêm vào FormData
            updatedFormData.append(key, value);
          } else if (key === "genres") {
            // Nếu là trường genres, thêm từng giá trị trong mảng vào FormData
            value.forEach((genre) => {
              updatedFormData.append("genres", genre);
            });
          } else {
            // Ngược lại, thêm giá trị vào FormData
            updatedFormData.append(key, value);
          }
        });
        console.log("Updates forms data", [...updatedFormData]);

        const response = await fetch(apiUrl, {
          method,
          // body: formData,
          body: updatedFormData,
        });

        if (response.ok) {
          console.log(
            editBook
              ? "Book updated successfully!"
              : "Book created successfully!"
          );
          handleShowSuccessModal();
          onBookAdded();
          // Clear editBook state after successful action
          if (editBook) {
            setEditBook(null);
            setTimeout(() => {
              resetForm();
              handleClose();
            }, 3000); // Delay for 5 seconds before closing
          }
        } else {
          console.error(
            editBook ? "Failed to update book" : "Failed to create book"
          );
        }
      } else {
        console.error("Form data is missing.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập tiêu đề."),
    authorName: yup.string().required("Vui lòng nhập tên tác giả."),
    image: yup
      .mixed()
      .required("Vui lòng chọn một tệp.")
      .test("fileFormat", "Định dạng tệp không hợp lệ", (value) => {
        if (value) {
          // console.log("hop le");
          const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
          return allowedFormats.includes(value.type);
        }
        return false;
      }),
    publisher: yup.string().required("Vui lòng nhập nhà xuất bản."),
    publishDate: yup.string().required("Vui lòng nhập năm xuất bản."),
    noPages: yup.number().required("Vui lòng nhập số trang"),
    ISBN: yup.string().required("Vui lòng nhập ISBN."),
    desc: yup.string().required("Vui lòng nhập mô tả."),
    language: yup.string().required("Vui lòng chọn ngôn ngữ."),
    coverType: yup.string().required("Vui lòng chọn dạng sách."),
    genres: yup.array().required("Vui lòng chọn ít nhất một thể loại sách."),
  });

  useEffect(() => {
    // console.log("File:", selectedImage);
    console.log("Selected Image in useEffect:", selectedImage);
    // Thực hiện các hành động khác sau khi selectedImage thay đổi
  }, [selectedImage]);

  return (
    <Formik
      validationSchema={schema}
      encType="multipart/form-data"
      onSubmit={() => {}}
      // onSubmit={console.log}

      initialValues={{
        title: editBook ? editBook.title : "",
        authorName: editBook ? editBook.authorName : "",
        image: editBook ? editBook.coverLink : null,
        publisher: editBook ? editBook.publisher : "",

        publishDate: editBook ? editBook.publishDate : "",
        ISBN: editBook ? editBook.ISBN : "",
        noPages: editBook ? editBook.noPages : "",
        desc: editBook ? editBook.desc : "",
        coverType: editBook ? editBook.coverType : "",
        language: editBook ? editBook.language : "",
        genres: editBook ? editBook.genres : [],
      }}
    >
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        values,
        touched,
        errors,
        resetForm,
        handleBlur,
      }) => (
        <Form
          id="yourFormId"
          noValidate
          onSubmit={(e) => e.preventDefault()}
          encType="multipart/form-data"
        >
          <Row>
            <Form.Group
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề..."
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Bìa sách</Form.Label>
              {/* Hidden file input */}
              <Form.Control
                type="file"
                name="image"
                required
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={(e) => handleImageChange(e, setFieldValue)}
                isInvalid={touched.image && !!errors.image}
              />
              {/* Simulated button or div */}
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  border: "1px solid #ccc",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={handleChooseFileClick}
              >
                {selectedImage ? (
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    style={{ width: "100%", height: "100%" }}
                    thumbnail
                  />
                ) : values.image ? (
                  <Image
                    src={`${values.image}`}
                    alt="Selected"
                    style={{ width: "100%", height: "100%" }}
                    thumbnail
                  />
                ) : (
                  <Button
                    variant="outline-primary"
                    style={{ marginTop: "50px", marginLeft: "10px" }}
                  >
                    Choose File
                  </Button>
                )}
              </div>
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Tác giả</Form.Label>
              <Form.Control
                type="text"
                name="authorName"
                required
                value={values.authorName}
                onChange={handleChange}
                placeholder="Nhập tên tác giả..."
                isInvalid={!!errors.authorName}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.authorName}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Form.Group
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Nhà xuất bản</Form.Label>
              <Form.Control
                type="text"
                name="publisher"
                required
                value={values.publisher}
                onChange={handleChange}
                placeholder="Nhập nhà xuất bản..."
                isInvalid={!!errors.publisher}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.publisher}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col md={4}>
              <Form.Group
                controlId="validationFormik104"
                className="position-relative"
              >
                <Form.Label>Năm xuất bản</Form.Label>
                <Form.Control
                  type="text"
                  name="publishDate"
                  required
                  value={values.publishDate}
                  onChange={handleChange}
                  placeholder="VD:2000..."
                  isInvalid={!!errors.publishDate}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.publishDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                controlId="validationFormik105"
                className="position-relative"
              >
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  name="ISBN"
                  required
                  value={values.ISBN}
                  onChange={handleChange}
                  placeholder="Nhập ISBN..."
                  isInvalid={!!errors.ISBN}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.ISBN}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                controlId="validationFormik105"
                className="position-relative"
              >
                <Form.Label>Số trang</Form.Label>
                <Form.Control
                  type="number"
                  name="noPages"
                  required
                  value={values.noPages}
                  onChange={handleChange}
                  placeholder="VD:20..."
                  isInvalid={!!errors.noPages}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.noPages}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ marginTop: "15px" }}>
            <Form.Group
              controlId="validationFormik105"
              className="position-relative"
            >
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                name="desc"
                required
                value={values.desc}
                onChange={handleChange}
                placeholder="Nhập mô tả..."
                isInvalid={!!errors.desc}
                style={{ width: "100%", height: "100px" }}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.desc}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Col>
              <Form.Group
                controlId="validationFormikLanguage"
                className="position-relative"
              >
                <Form.Label>Dạng sách</Form.Label>
                <Form.Control
                  as="select"
                  name="coverType"
                  value={values.coverType}
                  onChange={handleChange}
                  isInvalid={touched.coverType && !!errors.coverType}
                >
                  <option value="">Chọn dạng sách</option>
                  <option value="Paperback">Paperback</option>
                  <option value="Hardcover">Hardcover</option>
                  {/* Thêm các ngôn ngữ khác nếu cần */}
                </Form.Control>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.coverType}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                controlId="validationFormikLanguage"
                className="position-relative"
              >
                <Form.Label>Ngôn ngữ</Form.Label>
                <Form.Control
                  as="select"
                  name="language"
                  value={values.language}
                  onChange={handleChange}
                  isInvalid={touched.language && !!errors.language}
                >
                  <option value="">Chọn ngôn ngữ</option>
                  <option value="English">English</option>
                  <option value="Vietnamese">Vietnamese</option>
                  {/* Thêm các ngôn ngữ khác nếu cần */}
                </Form.Control>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.language}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ marginTop: "15px" }}>
            <Form.Group
              controlId="validationFormikGenres"
              className="position-relative"
            >
              <Form.Label>Thể loại sách</Form.Label>
              {["mystery", "horror", "adventure"].map((genre) => (
                <Form.Check
                  key={genre}
                  type="checkbox"
                  id={`genre-${genre}`}
                  label={genre}
                  name="genres"
                  value={genre}
                  checked={values.genres?.includes(genre) ?? false}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    const updatedGenres = checked
                      ? [...values.genres, value]
                      : values.genres.filter((v) => v !== value);

                    handleChange({
                      target: {
                        name: "genres",
                        value: updatedGenres,
                      },
                    });
                  }}
                />
              ))}
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.genres}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "15px" }}></Row>
          <Row style={{ marginTop: "20px", textAlign: "center" }}>
            <Col>
              <Button
                variant="outline-danger"
                onClick={() => {
                  resetForm();
                }}
              >
                Hủy bỏ
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-success"
                onClick={(e) => {
                  const formElement = document.getElementById("yourFormId");
                  if (formElement) {
                    setFormData(new FormData(formElement));
                    handleShowConfirmationModal();
                  } else {
                    console.error("Form element not found");
                  }
                }}
              >
                Xác nhận
              </Button>
            </Col>
          </Row>

          <Modal
            show={showConfirmationModal}
            onHide={handleCloseConfirmationModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isEditMode
                ? "Bạn có chắc chắn muốn chỉnh sửa sách này không?"
                : "Bạn có chắc chắn muốn thêm sách này không?"}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseConfirmationModal}
              >
                Hủy bỏ
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleFormSubmit(values, resetForm);
                  handleCloseConfirmationModal();
                }}
              >
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
            <Modal.Header closeButton>
              <Modal.Title>Thành công</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isEditMode
                ? "Bạn đã chỉnh sửa thành công!"
                : "Sách đã được thêm thành công!"}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => handleCloseSuccessModal(resetForm)}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default Forms;
