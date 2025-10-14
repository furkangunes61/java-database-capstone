Bu Spring Boot uygulaması hem MVC hem REST controller’larını kullanır.
Thymeleaf, admin ve doktor panellerinde HTML sayfaları üretir.
REST API’ler diğer modüllerde (hasta, randevu, kayıtlar) JSON verisi döner.
Uygulama MySQL (yapısal veriler) ve MongoDB (reçeteler) ile çalışır.
Controller katmanı istekleri Service katmanına yönlendirir; Service de uygun Repository’yi kullanır.

1. Kullanıcı AdminDashboard veya Appointment sayfasına girer.
2. İstek ilgili Thymeleaf veya REST Controller’a yönlendirilir.
3. Controller, Service katmanına çağrı yapar.
4. Service, iş kurallarını uygular ve Repository katmanını çağırır.
5. Repository, MySQL veya MongoDB’den veriyi alır.
6. Veriler modele bağlanır (@Entity, @Document).
7. Sonuç HTML veya JSON olarak istemciye gönderilir.
