// function TurfListLogic() {
//     const [page, setPage] = useState('manageTurf');
//     const [turfList, setTurfList] = useState([]);
  
//     // Load data from LocalStorage when the component mounts
//     useEffect(() => {
//       const storedTurfs = JSON.parse(localStorage.getItem('turfList'));
//       if (storedTurfs) {
//         setTurfList(storedTurfs);
//       }
//     }, []);
  
//     // Add turf and store in LocalStorage
//     const addTurf = (turf) => {
//       const updatedTurfList = [...turfList, turf];
//       setTurfList(updatedTurfList);
//       localStorage.setItem('turfList', JSON.stringify(updatedTurfList));
//     };
  
//     // Update turf list and store in LocalStorage
//     const updateTurfList = (updatedTurfList) => {
//       setTurfList(updatedTurfList);
//       localStorage.setItem('turfList', JSON.stringify(updatedTurfList));
//     };
  
//     // Clear all turfs from LocalStorage
//     const clearTurfList = () => {
//       localStorage.removeItem('turfList');
//       setTurfList([]);
//     };
  
//     return (
//       <div className="App">
//         <h1>My Turf Bookings</h1>
//         <hr />
//         {page === 'manageTurf' ? (
//           <>
//             <ManageTurf addTurf={addTurf} setPage={setPage} />
//             <div className="nav">
//               <button onClick={() => setPage('manageTurfList')}>Turf List</button>
//             </div>
//           </>
//         ) : (
//           <>
//             <ManageTurfList turfList={turfList} updateTurfList={updateTurfList} />
//             <div className="nav">
//               <button onClick={() => setPage('manageTurf')}>Manage Turf</button>
//               <button onClick={clearTurfList}>Clear Data</button>
//             </div>
//           </>
//         )}
//       </div>
//     );
//   }
  
//   export default TurfListLogic;
  