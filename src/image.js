import MD5 from 'md5-es';

function getArticleImg(article) {
  if (article.images) {
    const images = article.images.filter((image) => {
      // File:Wikisource-logo.svg
      // File:Edit-clear.svg
      // File:Gnome-dev-cdrom-audio.svg
      // File:Star full.svg
      // File:Star half.svg
      // File:Ambox important.svg
      // File:Creatorballoon.png
      // File:Commons-logo.svg
      // File:Wikispecies-logo.svg
      // File:Crystal Clear app Login Manager 2.png
      // File:Musical notes.svg
      // File:Lock-green.svg
      // Use File:Flag only as last resort

      const val = image.title !== "File:Commons-logo.svg"
      if (val) console.log(`filtered image for ${article.title}`);
      return val;
    });
    // const fileName = "Killerwhales jumping.jpg"
    // console.log(article.images[0]);
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

export default getArticleImg;
