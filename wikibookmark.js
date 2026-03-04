$.when(mw.loader.using(['mediawiki.api', 'mediawiki.util']), $.ready).then(function () {

    // ==========================================
    // LINGUA
    // Usa la lingua preferita dell'utente nelle sue
    // preferenze. Se non è nel dizionario, prova la
    // lingua base (es. "pt-BR" → "pt"), poi inglese.
    // ==========================================
    var langFull = mw.config.get('wgUserLanguage') || 'en';
    var langBase = langFull.split('-')[0];

    var i18n = {
        'en': {
            saved:      'Saved',
            tooltip:    'Go to your saved pages',
            saving:     'Saving…',
            success:    '✅ Page saved! Find it under "Saved".',
            duplicate:  'This page was already saved.',
            noList:     'No list found. Enable Reading Lists in Preferences → Gadgets.',
            errConn:    'Connection error.',
            errSave:    'Error: ',
            btnTooltip: 'Save this page to your Reading Lists'
        },
        'it': {
            saved:      'Salvate',
            tooltip:    'Vai alle tue pagine salvate',
            saving:     'Salvataggio in corso…',
            success:    '✅ Pagina salvata! Puoi vederla in "Salvate".',
            duplicate:  'Questa pagina era già stata salvata.',
            noList:     'Nessuna lista trovata. Attiva le Reading Lists in Preferenze → Accessori.',
            errConn:    'Errore di connessione.',
            errSave:    'Errore: ',
            btnTooltip: 'Salva questa pagina nelle tue Reading Lists'
        },
        'fr': {
            saved:      'Sauvegardées',
            tooltip:    'Voir vos pages sauvegardées',
            saving:     'Sauvegarde en cours…',
            success:    '✅ Page sauvegardée ! Retrouvez-la dans « Sauvegardées ».',
            duplicate:  'Cette page a déjà été sauvegardée.',
            noList:     'Aucune liste trouvée. Activez les listes de lecture dans Préférences → Gadgets.',
            errConn:    'Erreur de connexion.',
            errSave:    'Erreur : ',
            btnTooltip: 'Sauvegarder cette page dans vos listes de lecture'
        },
        'de': {
            saved:      'Gespeichert',
            tooltip:    'Zu deinen gespeicherten Seiten',
            saving:     'Wird gespeichert…',
            success:    '✅ Seite gespeichert! Zu finden unter „Gespeichert".',
            duplicate:  'Diese Seite wurde bereits gespeichert.',
            noList:     'Keine Liste gefunden. Aktiviere Leselisten in Einstellungen → Helferlein.',
            errConn:    'Verbindungsfehler.',
            errSave:    'Fehler: ',
            btnTooltip: 'Diese Seite in deinen Leselisten speichern'
        },
        'es': {
            saved:      'Guardadas',
            tooltip:    'Ir a tus páginas guardadas',
            saving:     'Guardando…',
            success:    '✅ ¡Página guardada! Encuéntrala en «Guardadas».',
            duplicate:  'Esta página ya había sido guardada.',
            noList:     'No se encontró ninguna lista. Activa las listas de lectura en Preferencias → Accesorios.',
            errConn:    'Error de conexión.',
            errSave:    'Error: ',
            btnTooltip: 'Guardar esta página en tus listas de lectura'
        },
        'pt': {
            saved:      'Guardadas',
            tooltip:    'Ver as suas páginas guardadas',
            saving:     'A guardar…',
            success:    '✅ Página guardada! Encontra-a em «Guardadas».',
            duplicate:  'Esta página já foi guardada.',
            noList:     'Nenhuma lista encontrada. Ativa as listas de leitura em Preferências → Ferramentas.',
            errConn:    'Erro de ligação.',
            errSave:    'Erro: ',
            btnTooltip: 'Guardar esta página nas tuas listas de leitura'
        },
        'zh': {
            saved:      '已保存',
            tooltip:    '前往您保存的页面',
            saving:     '正在保存…',
            success:    '✅ 页面已保存！在"已保存"中查看。',
            duplicate:  '此页面已经保存过了。',
            noList:     '未找到列表。请在首选项 → 小工具中启用阅读列表。',
            errConn:    '连接错误。',
            errSave:    '错误：',
            btnTooltip: '将此页面保存到您的阅读列表'
        },
        'ru': {
            saved:      'Сохранённые',
            tooltip:    'Перейти к сохранённым страницам',
            saving:     'Сохранение…',
            success:    '✅ Страница сохранена! Найдите её в разделе «Сохранённые».',
            duplicate:  'Эта страница уже была сохранена.',
            noList:     'Список не найден. Включите списки чтения в настройках → Гаджеты.',
            errConn:    'Ошибка соединения.',
            errSave:    'Ошибка: ',
            btnTooltip: 'Сохранить эту страницу в списки чтения'
        },
        'ja': {
            saved:      '保存済み',
            tooltip:    '保存したページを見る',
            saving:     '保存中…',
            success:    '✅ 保存しました！「保存済み」から確認できます。',
            duplicate:  'このページはすでに保存されています。',
            noList:     'リストが見つかりません。設定 → ガジェットで読書リストを有効にしてください。',
            errConn:    '接続エラー。',
            errSave:    'エラー: ',
            btnTooltip: 'このページを読書リストに保存する'
        },
        'ar': {
            saved:      'المحفوظات',
            tooltip:    'اذهب إلى صفحاتك المحفوظة',
            saving:     'جارٍ الحفظ…',
            success:    '✅ تم حفظ الصفحة! ستجدها في «المحفوظات».',
            duplicate:  'هذه الصفحة محفوظة بالفعل.',
            noList:     'لم يتم العثور على قائمة. فعّل قوائم القراءة من التفضيلات ← الأدوات.',
            errConn:    'خطأ في الاتصال.',
            errSave:    'خطأ: ',
            btnTooltip: 'احفظ هذه الصفحة في قوائم قراءتك'
        }
    };

    // Cerca la lingua esatta, poi la lingua base, poi inglese come fallback
    var t = i18n[langFull] || i18n[langBase] || i18n['en'];

    // ==========================================
    // 1. LINK NEL MENU PERSONALE
    //    Passiamo null come ancora: funziona su
    //    qualsiasi tema grafico di Wikipedia
    // ==========================================
    mw.util.addPortletLink(
        'p-personal',
        mw.util.getUrl('Special:ReadingLists'),
        t.saved,
        'pt-readinglists-link',
        t.tooltip,
        null,
        null
    );

    // ==========================================
    // 2. ICONA SEGNALIBRO
    //    Visibile solo su pagine reali (non speciali)
    //    Proviamo prima p-views, poi p-cactions
    //    come fallback per temi diversi
    // ==========================================
    if (mw.config.get('wgNamespaceNumber') >= 0) {

        var bookmarkLink = mw.util.addPortletLink(
            'p-views', '#', '', 'ca-bookmark-icon', t.btnTooltip, null, null
        );

        // Fallback per temi che non hanno p-views
        if (!bookmarkLink) {
            bookmarkLink = mw.util.addPortletLink(
                'p-cactions', '#', '', 'ca-bookmark-icon', t.btnTooltip, null, null
            );
        }

        if (bookmarkLink) {
            var $link = $(bookmarkLink).find('a');

            var svgEmpty  = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path d="M4 2v16l6-4.5L16 18V2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
            var svgFilled = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path d="M4 2v16l6-4.5L16 18V2z" fill="currentColor"/></svg>';

            $link.empty().append($(svgEmpty));
            $link.css({ display: 'flex', alignItems: 'center', padding: '0 8px' });
            $(bookmarkLink).css({ backgroundImage: 'none', listStyle: 'none' });

            $link.on('click', function (e) {
                e.preventDefault();
                $link.empty().append($(svgFilled));
                mw.notify(t.saving, { type: 'info' });

                var api = new mw.Api();
                var projectUrl = window.location.protocol + '//' + window.location.host;

                api.get({
                    action: 'query',
                    meta: 'readinglists',
                    format: 'json'
                }).done(function (data) {
                    var lists = data.query && data.query.readinglists;

                    if (!lists || lists.length === 0) {
                        $link.empty().append($(svgEmpty));
                        mw.notify(t.noList, { type: 'warn' });
                        return;
                    }

                    var defaultList = lists[0];
                    for (var i = 0; i < lists.length; i++) {
                        if (lists[i].isdefault) { defaultList = lists[i]; break; }
                    }

                    api.postWithToken('csrf', {
                        action: 'readinglists',
                        command: 'createentry',
                        list: defaultList.id,
                        project: projectUrl,
                        title: mw.config.get('wgPageName')
                    }).done(function () {
                        mw.notify(t.success, { type: 'success' });
                    }).fail(function (code) {
                        if (code === 'duplicate') {
                            mw.notify(t.duplicate, { type: 'info' });
                        } else {
                            $link.empty().append($(svgEmpty));
                            mw.notify(t.errSave + code, { type: 'error' });
                        }
                    });

                }).fail(function () {
                    $link.empty().append($(svgEmpty));
                    mw.notify(t.errConn, { type: 'error' });
                });
            });
        }
    }

});
