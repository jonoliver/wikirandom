import MD5 from 'md5-es';

function getArticleImg(page) {
  const images = page.images && filterImages(page.images);
  if (images && images.length > 0) {
    const fileName = images[0].title.replace(/^File:/, '').replace(/\s/g,'_');
    const hash = MD5.hash(fileName);
    const char0 = hash[0];
    const char1 = hash[1];
    // Thumbnail
    // 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/1920px-Killerwhales_jumping.jpg'
    // TODO: Handle files not in /commons:
    //upload.wikimedia.org/wikipedia/en/6/61/Lord_of_the_Rings_Game_One.jpg
    // TODO: filter out File:Commons-logo.svg
    return `https://upload.wikimedia.org/wikipedia/commons/${char0}/${char0}${char1}/${fileName}`;
  }
  return null;
}

function filterImages(images) {
  const blackList = [
    "File:Commons-logo.svg",
    "File:Wikisource-logo.svg",
    "File:Edit-clear.svg",
    "File:Gnome-dev-cdrom-audio.svg",
    "File:Star full.svg",
    "File:Star half.svg",
    "File:Ambox important.svg",
    "File:Creatorballoon.png",
    "File:Commons-logo.svg",
    "File:Wikispecies-logo.svg",
    "File:Crystal Clear app Login Manager 2.png",
    "File:Musical notes.svg",
    "File:Lock-green.svg",
    "File:Disambig gray.svg",
    "File:Arrow Blue LowerLeft 001.svg"
  ];
  // Use File:Flag only as last resort
  return images.filter((image) => !blackList.includes(image.title));
}

export default getArticleImg;