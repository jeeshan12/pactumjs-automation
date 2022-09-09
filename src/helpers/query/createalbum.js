function createAlbum() {
  return `mutation createAlbum($input: CreateAlbumInput!) {
        createAlbum(input: $input){
          id
          title
        }
      }`;
}

module.exports = {
  createAlbum: createAlbum,
};
