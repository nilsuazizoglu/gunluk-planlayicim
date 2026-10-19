# Proje teslim kılavuzu — adım adım

Bu proje, verilen yönergedeki React kullanma, CSS ile arayüz hazırlama, ekle/listele/güncelle/sil işlemlerini gerçekleştirme, ekran görüntüsü alma, GitHub'a yükleme ve Netlify'da yayımlama maddelerini karşılamak üzere hazırlanmıştır.

## 1. Önce bilgisayarında çalıştır

1. Node.js yüklü değilse resmi siteden LTS sürümünü kur: https://nodejs.org/
2. Bu klasörü bilgisayarında kolay bulacağın bir yere çıkar.
3. Visual Studio Code'u aç; **File > Open Folder** ile `gunluk-planlayici` klasörünü seç.
4. **Terminal > New Terminal** menüsünü aç.
5. Terminale `npm install` yazıp Enter'a bas. İşlemin bitmesini bekle.
6. Ardından `npm run dev` yazıp Enter'a bas.
7. Terminalde görünen `http://localhost:5173` benzeri adrese Ctrl tuşuyla tıklayabilir veya adresi tarayıcıya kopyalayabilirsin.
8. Siteyi kapatmak istediğinde terminale dönüp `Ctrl + C` tuşlarına bas.

## 2. Projeyi kendin test et

- **Ekleme:** Bir görev yaz, kategori ve öncelik seç, “Görev ekle”ye tıkla.
- **Listeleme:** Eklediğin görevin sağdaki listede göründüğünü kontrol et.
- **Güncelleme:** Kalem simgesine bas, metni veya seçeneği değiştir, “Kaydet”e bas.
- **Silme:** Çöp kutusu simgesine bas. Onay penceresinde silmek istiyorsan onayla.
- **Tamamlama:** Soldaki küçük kutuya bas; görev üstü çizili görünmeli ve ilerleme yüzdesi değişmeli.
- **Filtre:** “Tümü”, “Devam edenler” ve “Tamamlananlar” filtrelerini dene.
- **Kalıcı kayıt:** Sayfayı yenile. Görevler hâlâ duruyorsa LocalStorage çalışıyor demektir.
- Boş görev eklemeyi de dene; uygulama uyarı vermeli.

## 3. Ekran görüntüsü al

1. En az iki örnek görev ekle. Birini tamamlandı olarak işaretle ki arayüz dolu görünsün.
2. Tarayıcı penceresini düzenli görünecek şekilde büyüt.
3. Windows'ta `Win + Shift + S` tuşlarına bas.
4. Uygulamanın görünen bölümünü seç.
5. Görüntüyü `proje-ekran-goruntusu.png` adıyla kaydet.
6. Bu ekran görüntüsünü teslim sisteminde istenen alana ekle. İstersen GitHub deposuna da `screenshots` adlı klasör açıp ekleyebilirsin.

## 4. GitHub'a yükle

1. https://github.com/ adresinde hesabına giriş yap.
2. Sağ üstteki **+ > New repository** seçeneğine bas.
3. Repository adı olarak `gunluk-planlayicim` yaz.
4. **Public** seç.
5. GitHub web sayfası üzerinden yüklemek istersen **uploading an existing file** seçeneğini kullanıp bu klasördeki dosyaları yükle. `node_modules` klasörü varsa yükleme; normalde bu projede kurulumdan sonra oluşur ve çok büyüktür.
6. Dosyaları yükledikten sonra commit mesajına `İlk proje yüklemesi` yazıp commit et.
7. Oluşan repository adresini kopyala. Örnek biçim: `https://github.com/KULLANICI_ADIN/gunluk-planlayicim`
8. `KULLANICI_ADIN` örnektir; kendi bağlantını kullanmalısın.

> İstersen Git kullanarak da yükleyebilirsin. Bunun için Git'in kurulu ve yapılandırılmış olması gerekir; ilk kez yapıyorsan web arayüzü daha kolay olabilir.

## 5. Netlify'da yayımla

En kolay yöntem GitHub deposunu Netlify'a bağlamaktır.

1. https://www.netlify.com/ adresinde hesap aç veya giriş yap.
2. **Add new site** / **Import an existing project** seçeneğini aç.
3. GitHub hesabını bağla ve az önce yüklediğin `gunluk-planlayicim` deposunu seç.
4. Build command alanına `npm run build` yaz.
5. Publish directory alanına `dist` yaz.
6. Deploy işlemini başlat ve bitmesini bekle.
7. Netlify'ın verdiği canlı site bağlantısını açıp sitenin çalıştığını test et.
8. Canlı bağlantıyı kopyala; teslim formunda GitHub bağlantısıyla birlikte paylaş.

Netlify ekranlarının isimleri zamanla değişebilir. Bir ayar farklı görünürse Netlify'ın güncel yönlendirmesini takip et.

## 6. Teslim etmeden önce son kontrol

- [ ] Proje bilgisayarımda çalışıyor.
- [ ] Görev ekleme çalışıyor.
- [ ] Görev listeleme çalışıyor.
- [ ] Görev güncelleme çalışıyor.
- [ ] Görev silme çalışıyor.
- [ ] Tamamlama ve filtreleme çalışıyor.
- [ ] Sayfa yenilenince görevler korunuyor.
- [ ] En az bir ekran görüntüsü aldım.
- [ ] GitHub deposu **Public** ve dosyalar yüklenmiş.
- [ ] Netlify canlı bağlantısı açılıyor.
- [ ] Teslim formuna GitHub ve Netlify bağlantılarını ekledim.

## 7. Dosya yapısı ne işe yarıyor?

- `src/main.jsx`: React uygulamasını HTML sayfasına bağlar.
- `src/pages/App.jsx`: Sayfanın genel düzenini ve görevlerin durumunu yönetir.
- `src/components/TaskForm.jsx`: Görev ekleme ve düzenleme formu.
- `src/components/TaskItem.jsx`: Tek bir görevin görünümü ve işlem butonları.
- `src/styles.css`: Renkler, boşluklar, kartlar ve mobil görünüm.
- `index.html`: Tarayıcının açtığı ana HTML belgesi.
- `package.json`: Kullanılan paketler ve çalıştırma komutları.
- `README.md`: Projenin kısa açıklaması ve kurulum bilgisi.

## 8. Kodu sunarken anlatabileceğin temel mantık

- React bileşenleri arayüzü küçük, yönetilebilir parçalara ayırır.
- `useState`, görev listesi ve seçili filtre gibi değişen bilgileri tutar.
- `useEffect`, görev listesi değiştiğinde bilgileri LocalStorage'a kaydeder.
- `map`, görevleri ekranda göstermek ve güncellenen görevi değiştirmek için kullanılır.
- `filter`, silme ve görünüm filtrelemesi için kullanılır.
- LocalStorage verileri bu tarayıcıda saklar; başka bilgisayara veya tarayıcıya otomatik taşınmaz.
