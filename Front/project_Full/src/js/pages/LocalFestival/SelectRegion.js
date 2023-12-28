// SelectRegion.js
import React from 'react';

const SelectRegion = ({ onSelect }) => {
  const regions = ['서울', '부산', '인천', '대구', '광주', '대전', '울산'];

  // 지역 선택 시 상태 업데이트
  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    onSelect(selectedRegion);
  };

  return (
    <div style={{ textAlign: 'right', marginTop: '20px' }}>
  <label>지역 선택:</label>
  <select onChange={handleRegionChange}>
    <option value="">-- 선택 --</option>
    {regions.map((region, index) => (
      <option key={index} value={region}>
        {region}
      </option>
    ))}
  </select>
</div>
  );
};

export default SelectRegion;