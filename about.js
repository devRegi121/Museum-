document.addEventListener('DOMContentLoaded', () => {
    const moreBtn = document.createElement('button');
    moreBtn.textContent = "Read More";
    moreBtn.style.display = "block";
    moreBtn.style.margin = "10px auto";

    const historySection = document.querySelector('#history');
    const extraInfo = document.createElement('p');
    extraInfo.textContent = "Our mission at the Muzard Museum is to foster a deeper understanding of the world's diverse cultures, promote creativity, and inspire learning through the arts. We aim to provide an immersive experience that encourages exploration and reflection on the cultural forces that have shaped humanity. Our vision is to be a hub for both local and international visitors, serving as a place where the timeless art of yesterday meets the groundbreaking ideas of tomorrow.";
    extraInfo.style.display = "none";

    historySection.appendChild(moreBtn);
    historySection.appendChild(extraInfo);

    moreBtn.addEventListener('click', () => {
        extraInfo.style.display = extraInfo.style.display === "none" ? "block" : "none";
        moreBtn.textContent = extraInfo.style.display === "none" ? "Read More" : "Read Less";
    });
});