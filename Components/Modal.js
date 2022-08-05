// import { TextContainer,Modal } from "@shopify/polaris";
// import { useCallback, useState } from "react";


// export default function modal({modal,rating}) {
//     // const [selected, setSelected] = useState(0);
// //     const [modal, setmodal] = useState({})
// //   const [rating, setRating] = useState({})

//     // const handleTabChange = useCallback(
//     //   (selectedTabIndex) => setSelected(selectedTabIndex),
//     //   []
//     // );
  
//     // const tabs = [
//     //   {
//     //     id: "all-customers-1",
//     //     content: "All",
//     //     accessibilityLabel: "All customers",
//     //     panelID: "all-customers-content-1",
//     //   },
//     //   {
//     //     id: "accepts-marketing-1",
//     //     content: "Active",
//     //     panelID: "accepts-marketing-content-1",
//     //   },
//     //   {
//     //     id: "repeat-customers-1",
//     //     content: "Draft",
//     //     panelID: "repeat-customers-content-1",
//     //   },
//     //   {
//     //     id: "prospects-1",
//     //     content: "Archived",
//     //     panelID: "prospects-content-1",
//     //   },
//     // ];
//     // function getModal(product) {
//     //   console.log(product.rating.rate);
//     //   setRating(product.rating)
//     //   setmodal(product)
//     //   setActive(!active)
//     // }
//     const [active, setActive] = useState(true);
//     const handleChange = useCallback(() => setActive(!active), [active]);
//     return(
//        <div style={{ height: "500px" }}>
//        {  modal && <Modal
//           open={active}
//           onClose={handleChange}
//           title={modal.title}
//         >
//           <Modal.Section>
//             <TextContainer>
//               <div className="modal-container">
//                 <div className="modal-image">
//                   <img src={modal.image} alt="" />
//                 </div>
//                 <div className="modal-horzondal"></div>
//                 <div className="modal-description"
//                   style={{ marginLeft: "2rem" }}>
//                   <h1>Description:</h1> <br />
//                   <p>{modal.description}</p>
//                 </div>
//                 <div className="modal-horzondal"></div>
//                 <div className="modal rating"
//                   style={{ marginLeft: "2rem" }}>
//                   <h1>Rating:</h1> <br />
//                   <span style={{ fontWeight: "bolder", }} > Rating: </span>
//                   <span> &nbsp;{rating.rate}</span>  <br />
//                   <span style={{ fontWeight: "bolder", }} > Rated by: </span>
//                   <span> &nbsp;{rating.count}</span>
//                 </div>
//               </div>
//             </TextContainer>
//           </Modal.Section>
//         </Modal>}
//       </div>
//     )
// }