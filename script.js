document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
  
    images.forEach(image => {
      // Fonction pour redimensionner et compresser l'image
      const resizeAndCompressImage = (img, maxWidth = 400, quality = 0.3) => {
        // Créer un élément canvas pour redimensionner l'image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Calculer les nouvelles dimensions pour garder le ratio
        const ratio = img.naturalWidth / img.naturalHeight;
        if (img.naturalWidth > maxWidth) {
          canvas.width = maxWidth;
          canvas.height = maxWidth / ratio;
        } else {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }
  
        // Dessiner l'image sur le canvas redimensionné
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        // Obtenir les données de l'image compressée en format JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
  
        // Remplacer la source de l'image par la version compressée
        img.src = compressedDataUrl;
      };
  
      // Une fois l'image chargée, redimensionner et compresser
      image.onload = () => {
        resizeAndCompressImage(image, 800, 0.4); // Ajuster à une largeur max de 800px et 40% de qualité
      };
    });
  });
  