// import React, { useEffect, useState } from "react";
// import  "../styles/ResultPage.css";
// import Header from '../components/Header';
// import { useLocation } from 'react-router-dom';

// const ResultPage = () => {
// 	const { kakao } = window;
//   const location = useLocation();
//   const addressList = location.state?.addressList || [];
//   const [xLoc, setXLoc] = useState(0.0);
//   const [yLoc, setYLoc] = useState(0.0);

//   console.log(addressList);
//   var geocoder = new kakao.maps.services.Geocoder();
//   var coordsArray = [];
//   var totalX = 0.0;
//   var totalY = 0.0;

//   const calculate = async () => {
//     var promises = addressList.map(address =>
//       new Promise((resolve, reject) => {
//           geocoder.addressSearch(address, function (result, status) {
//               if (status === kakao.maps.services.Status.OK) {
//                   var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
//                   resolve(coords);
//               } else {
//                   reject(status);
//               }
//           });
//       })
//     );

//     try {
//         coordsArray = await Promise.all(promises);
//         console.log(coordsArray);
//     } catch (err) {
//         console.error(err);
//         alert('좌표를 가져오는데 실패했습니다.');
//         return;
//     }

//     for (var i = 0; i < coordsArray.length; i++) {
//         totalY += coordsArray[i].getLat();
//         totalX += coordsArray[i].getLng();
//     }

//     var averageX = totalX / coordsArray.length;
//     var averageY = totalY / coordsArray.length;

//     setXLoc(averageX);
//     setYLoc(averageY);
//   }
//   calculate();

// 	useEffect(() => {
//     console.log(xLoc);
//     console.log(yLoc);

//     var mapContainer = document.getElementById("map"),
//     mapOption = {
//         center: new kakao.maps.LatLng(yLoc,xLoc), //지도의 중심좌표
//         level: 3,
//     };

//     //지도 생성
//     var map = new kakao.maps.Map(mapContainer, mapOption);

//     //지도 확대, 축소를 제어할 수 있는 줌 컨트롤 생성
//     var zoomControl = new kakao.maps.ZoomControl();
//     map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//     var markers = [];

//     var markerPosition  = new kakao.maps.LatLng(yLoc, xLoc);
//     var imageSize = new kakao.maps.Size(49, 50);
//     var markerImage = new kakao.maps.MarkerImage("https://cdn.icon-icons.com/icons2/317/PNG/512/map-marker-icon_34392.png", imageSize);
//     // 마커를 생성합니다
//     var marker = new kakao.maps.Marker({
//       position: markerPosition,
//       image: markerImage,
//     });
//     // 마커가 지도 위에 표시되도록 설정합니다
//     marker.setMap(map);

//     var ps = new kakao.maps.services.Places(); 
//     var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); //검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우 생성

//     const searchForm = document.querySelector('.form');
//     searchForm.addEventListener('submit', function(e){
//       e.preventDefault();
//       searchPlaces();
//     })

//     function searchPlaces() {
//       var keyword = document.getElementById('keyword').value;
      
//       if (!keyword.replace(/^\s+|\s+$/g, '')) {
//         alert('키워드를 입력해주세요!');
//         return false;
//       }

//       var options = {
//         location: new kakao.maps.LatLng(yLoc,xLoc),
//         radius: 10000,
//       };
//       ps.keywordSearch(keyword, placesSearchCB, options); //장소 검색 객체를 통해 키워드로 장소 검색을 요청함
//     }

//     // 장소 검색 완료 시 호출되는 콜백함수
//     function placesSearchCB(data, status, pagination) {
//       if (status === kakao.maps.services.Status.OK) {
//         // 정상적으로 검색이 완료됐으면 검색 목록과 마커 보여줌
//         displayPlaces(data);
//         // 페이지 번호를 보여줌
//         displayPagination(pagination);
//       } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//         alert("검색 결과가 존재하지 않습니다.");
//         return;
//       } else if (status === kakao.maps.services.Status.ERROR) {
//         alert("검색 결과 중 오류가 발생했습니다.");
//         return;
//       }
//     }

//     // 검색 결과 목록과 마커를 표출하는 함수
//     function displayPlaces(places) {
//       var listEl = document.getElementById("placesList"),
//         menuEl = document.getElementById("menu_wrap"),
//         fragment = document.createDocumentFragment(),
//         bounds = new kakao.maps.LatLngBounds(),
//         listStr = "";

//       removeAllChildNods(listEl); //검색 결과 목록에 추가된 항목들을 제거
//       removeMarker(); //지도에 표시되고 있는 마커를 제거

//       for (var i = 0; i < places.length; i++) {
//         //마커를 생성하고 지도에 표시
//         var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//           marker = addMarker(placePosition, i),
//           itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

//         //검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가
//         bounds.extend(placePosition);

//         //마커와 검색결과 항목에 mouseover 했을때 해당 장소 인포윈도우에 장소명을 표시
//         (function (marker, title, address, url) {
//           kakao.maps.event.addListener(marker, "mouseover", function () {
//             displayInfowindow(marker, title, address, url);
//           });

//           itemEl.onmouseover = function () {
//             displayInfowindow(marker, title, address, url);
//           };

//           itemEl.onmouseout = function () {
//             infowindow.close();
//           };
//         })(marker, places[i].place_name, places[i].road_address_name, places[i].place_url);

//         fragment.appendChild(itemEl);
//       }

//       //검색 결과 항목들을 검색 결과 목록 Element에 추가
//       listEl.appendChild(fragment);
//       menuEl.scrollTop = 0;

//       // 검색된 장소 위치를 기준으로 지도 범위를 재설정
//       map.setBounds(bounds);
//     }

//     //검색결과 항목을 Element로 반환하는 함수
//     function getListItem(index, places) {
//       var el = document.createElement('li'),
//       itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
//                   '<div class="info">' +
//                   '   <h5>' + places.place_name + '</h5>';
  
//       if (places.road_address_name) {
//           itemStr += '    <span>' + places.road_address_name + '</span>' +
//                       '   <span class="jibun gray">' +  places.address_name  + '</span>';
//       } else {
//           itemStr += '    <span>' +  places.address_name  + '</span>'; 
//       }
                   
//         itemStr += '  <span class="tel">' + places.phone  + '</span>' +
//                   '</div>';           
  
//       el.innerHTML = itemStr;
//       el.className = 'item';
  
//       return el;
//   }

//     //마커를 생성하고 지도 위에 마커를 표시하는 함수
//     function addMarker(position, idx, title) {
//       var imageSrc =
//           "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
//         imageSize = new kakao.maps.Size(36, 37), // 마커 이미지 크기
//         imgOptions = {
//           spriteSize: new kakao.maps.Size(36, 691), //스프라이트 이미지의 크기
//           spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), //스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//           offset: new kakao.maps.Point(13, 37), //마커 좌표에 일치시킬 이미지 내에서의 좌표
//         },
//         markerImage = new kakao.maps.MarkerImage(
//           imageSrc,
//           imageSize,
//           imgOptions
//         ),
//         marker = new kakao.maps.Marker({
//           position: position, //마커의 위치
//           image: markerImage,
//         });

//       marker.setMap(map); //지도 위에 마커를 표출
//       markers.push(marker); //배열에 생성된 마커를 추가

//       return marker;
//     }

//     // 지도 위에 표시되고 있는 마커를 모두 제거
//     function removeMarker() {
//       for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(null);
//       }
//       markers = [];
//     }

//     // 검색결과 목록 하단에 페이지번호를 표시는 함수
//     function displayPagination(pagination) {
//       var paginationEl = document.getElementById("pagination"),
//         fragment = document.createDocumentFragment(),
//         i;

//       // 기존에 추가된 페이지번호를 삭제
//       while (paginationEl.hasChildNodes()) {
//         paginationEl.removeChild(paginationEl.lastChild);
//       }

//       for (i = 1; i <= pagination.last; i++) {
//         var el = document.createElement("a");
//         el.href = "#";
//         el.innerHTML = i;

//         if (i === pagination.current) {
//           el.className = "on";
//         } else {
//           el.onclick = (function (i) {
//             return function () {
//               pagination.gotoPage(i);
//             };
//           })(i);
//         }

//         fragment.appendChild(el);
//       }
//       paginationEl.appendChild(fragment);
//     }

//     //검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
//     //인포윈도우에 장소명을 표시
//     function displayInfowindow(marker, title, address, url) {
//       var content = '<div style="width: 200px; padding:5px; z-index:1; color:black; text-align:center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">';
//       content += '<span style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 2px;">' + title + '</span>';
//       content += '<p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 2px;">' + address + '</p>';
//       content += '<a href="' + url + '" target="_blank" style="margin-left:10px; color:blue; font-weight: bold;">더 보기</a></div>';

//       infowindow.setContent(content);
//       infowindow.open(map, marker);
//     }

//     // 검색결과 목록의 자식 Element를 제거하는 함수
//     function removeAllChildNods(el) {
//       while (el.hasChildNodes()) {
//         el.removeChild(el.lastChild);
//       }
//     }
//   },[xLoc,yLoc]);

//   return (
//     <div>
//       <Header />
//       <div className="map_wrap">
//       <div id="map" style={{ width: '100%', height: '90vh', position: 'absolute', overflow: 'hidden' }}></div>
//         <div id="menu_wrap" className="bg_white">
//           <div className="option">
//             <div>
//               <form className="form" onSubmit={(e) => e.preventDefault()}>
//                 <input type="text" defaultValue="" id="keyword" placeholder="찾고 싶은 장소를 검색해주세요." size="27" /> 
//                 <button type="submit">검색하기</button> 
//               </form>
//             </div>
//           </div>
//         <hr />
//         <ul id="placesList"></ul>
//       <div id="pagination"></div>
//     </div>
//   </div>
//     </div>
//   );
// };

// export default ResultPage;

import React, { useEffect, useState } from "react";
import "../styles/ResultPage.css";
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const { kakao } = window;
  const location = useLocation();
  const addressList = location.state?.addressList || [];
  const [xLoc, setXLoc] = useState(0.0);
  const [yLoc, setYLoc] = useState(0.0);

  console.log(addressList);
  const geocoder = new kakao.maps.services.Geocoder();

  const calculate = async () => {
    const promises = addressList.map(address =>
      new Promise((resolve, reject) => {
        geocoder.addressSearch(address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            resolve(coords);
          } else {
            reject(status);
          }
        });
      })
    );

    try {
      const coordsArray = await Promise.all(promises);
      console.log(coordsArray);

      const totalX = coordsArray.reduce((sum, coords) => sum + coords.getLng(), 0);
      const totalY = coordsArray.reduce((sum, coords) => sum + coords.getLat(), 0);
      
      const averageX = totalX / coordsArray.length;
      const averageY = totalY / coordsArray.length;

      setXLoc(averageX);
      setYLoc(averageY);
    } catch (err) {
      console.error(err);
      alert('좌표를 가져오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    if (kakao && xLoc && yLoc) {
      var mapContainer = document.getElementById("map"),
          mapOption = {
            center: new kakao.maps.LatLng(yLoc, xLoc),
            level: 3,
          };

      // 지도 생성
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 줌 컨트롤 생성
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 마커 설정
      const markerPosition = new kakao.maps.LatLng(yLoc, xLoc);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 검색 기능 추가
      const ps = new kakao.maps.services.Places();
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      const searchForm = document.querySelector('.form');
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        searchPlaces();
      });

      function searchPlaces() {
        const keyword = document.getElementById('keyword').value;

        if (!keyword.trim()) {
          alert('키워드를 입력해주세요!');
          return false;
        }

        const options = {
          location: new kakao.maps.LatLng(yLoc, xLoc),
          radius: 10000,
        };
        ps.keywordSearch(keyword, placesSearchCB, options);
      }

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          displayPlaces(data);
          displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      }

      function displayPlaces(places) {
        const listEl = document.getElementById("placesList"),
              menuEl = document.getElementById("menu_wrap"),
              fragment = document.createDocumentFragment(),
              bounds = new kakao.maps.LatLngBounds();

        removeAllChildNods(listEl);
        removeMarker();

        for (let i = 0; i < places.length; i++) {
          const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, places[i]);

          bounds.extend(placePosition);

          (function (marker, title, address, url) {
            kakao.maps.event.addListener(marker, "mouseover", function () {
              displayInfowindow(marker, title, address, url);
            });

            itemEl.onmouseover = function () {
              displayInfowindow(marker, title, address, url);
            };

            itemEl.onmouseout = function () {
              infowindow.close();
            };
          })(marker, places[i].place_name, places[i].road_address_name, places[i].place_url);

          fragment.appendChild(itemEl);
        }

        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;
        map.setBounds(bounds);
      }

      function getListItem(index, places) {
        const el = document.createElement('li');
        let itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
                      '<div class="info">' +
                      '   <h5>' + places.place_name + '</h5>';

        if (places.road_address_name) {
          itemStr += '    <span>' + places.road_address_name + '</span>' +
                     '   <span class="jibun gray">' + places.address_name + '</span>';
        } else {
          itemStr += '    <span>' + places.address_name + '</span>';
        }

        itemStr += '  <span class="tel">' + places.phone + '</span>' +
                   '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';
        return el;
      }

      function addMarker(position, idx) {
        const marker = new kakao.maps.Marker({
          position: position,
        });

        marker.setMap(map);
        return marker;
      }

      function removeMarker() {
        // 마커 제거 코드 필요
      }

      function displayPagination(pagination) {
        const paginationEl = document.getElementById("pagination"),
              fragment = document.createDocumentFragment();

        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (let i = 1; i <= pagination.last; i++) {
          const el = document.createElement("a");
          el.href = "#";
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = "on";
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }

      function displayInfowindow(marker, title, address, url) {
        const content = `<div style="width: 200px; padding:5px; z-index:1; color:black; text-align:center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                          <span style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 2px;">${title}</span>
                          <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 2px;">${address}</p>
                          <a href="${url}" target="_blank" style="margin-left:10px; color:blue; font-weight: bold;">더 보기</a>
                        </div>`;

        infowindow.setContent(content);
        infowindow.open(map, marker);
      }

      function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      }
    }
  }, [addressList, xLoc, yLoc]);

  useEffect(() => {
    if (addressList.length > 0) {
      calculate(); // 처음에 좌표 계산
    }
  }, [addressList]);

  return (
    <div>
      <Header />
      <div className="map_wrap">
        <div id="map" style={{ width: '100%', height: '90vh', position: 'absolute', overflow: 'hidden' }}></div>
        <div id="menu_wrap" className="bg_white">
          <div className="option">
            <div>
              <form className="form">
                <input type="text" defaultValue="" id="keyword" placeholder="찾고 싶은 장소를 검색해주세요." size="27" />
                <button type="submit">검색하기</button>
              </form>
            </div>
          </div>
          <hr />
          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;