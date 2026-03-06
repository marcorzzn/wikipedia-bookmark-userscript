$.when(mw.loader.using(['mediawiki.api', 'mediawiki.util']), $.ready).then(function () {

    // ==========================================
    // PROTEZIONE ANTI-DOPPIA ESECUZIONE
    // Se lo script è già stato caricato (es. sia
    // global.js che common.js attivi), non fare nulla
    // ==========================================
    if (window.wikiBookmarkLoaded) return;
    window.wikiBookmarkLoaded = true;

    // ==========================================
    // TRADUZIONI
    // Usa la lingua delle preferenze utente.
    // Fallback: lingua base (pt-BR → pt), poi inglese.
    // ==========================================
    var langFull = mw.config.get('wgUserLanguage') || 'en';
    var langBase = langFull.split('-')[0];

    var i18n = {
        'en': {
            saved:        'Saved',
            tooltip:      'Go to your saved pages',
            saving:       'Saving…',
            removing:     'Removing…',
            success:      '✅ Page saved! Find it under "Saved".',
            removed:      '🗑️ Page removed from saved.',
            duplicate:    'This page was already saved.',
            noList:       'No list found. Enable Reading Lists in Preferences → Gadgets.',
            errConn:      'Connection error.',
            errSave:      'Error: ',
            btnTooltip:   'Save this page to your Reading Lists',
            btnTooltipOn: 'Remove this page from your Reading Lists'
        },
        'it': {
            saved:        'Salvate',
            tooltip:      'Vai alle tue pagine salvate',
            saving:       'Salvataggio in corso…',
            removing:     'Rimozione in corso…',
            success:      '✅ Pagina salvata! Puoi vederla in "Salvate".',
            removed:      '🗑️ Pagina rimossa dalle salvate.',
            duplicate:    'Questa pagina era già stata salvata.',
            noList:       'Nessuna lista trovata. Attiva le Reading Lists in Preferenze → Accessori.',
            errConn:      'Errore di connessione.',
            errSave:      'Errore: ',
            btnTooltip:   'Salva questa pagina nelle tue Reading Lists',
            btnTooltipOn: 'Rimuovi questa pagina dalle tue Reading Lists'
        },
        'fr': {
            saved:        'Sauvegardées',
            tooltip:      'Voir vos pages sauvegardées',
            saving:       'Sauvegarde en cours…',
            removing:     'Suppression en cours…',
            success:      '✅ Page sauvegardée ! Retrouvez-la dans « Sauvegardées ».',
            removed:      '🗑️ Page retirée des sauvegardées.',
            duplicate:    'Cette page a déjà été sauvegardée.',
            noList:       'Aucune liste trouvée. Activez les listes de lecture dans Préférences → Gadgets.',
            errConn:      'Erreur de connexion.',
            errSave:      'Erreur : ',
            btnTooltip:   'Sauvegarder cette page dans vos listes de lecture',
            btnTooltipOn: 'Retirer cette page de vos listes de lecture'
        },
        'de': {
            saved:        'Gespeichert',
            tooltip:      'Zu deinen gespeicherten Seiten',
            saving:       'Wird gespeichert…',
            removing:     'Wird entfernt…',
            success:      '✅ Seite gespeichert! Zu finden unter „Gespeichert".',
            removed:      '🗑️ Seite aus den gespeicherten entfernt.',
            duplicate:    'Diese Seite wurde bereits gespeichert.',
            noList:       'Keine Liste gefunden. Aktiviere Leselisten in Einstellungen → Helferlein.',
            errConn:      'Verbindungsfehler.',
            errSave:      'Fehler: ',
            btnTooltip:   'Diese Seite in deinen Leselisten speichern',
            btnTooltipOn: 'Diese Seite aus deinen Leselisten entfernen'
        },
        'es': {
            saved:        'Guardadas',
            tooltip:      'Ir a tus páginas guardadas',
            saving:       'Guardando…',
            removing:     'Eliminando…',
            success:      '✅ ¡Página guardada! Encuéntrala en «Guardadas».',
            removed:      '🗑️ Página eliminada de guardadas.',
            duplicate:    'Esta página ya había sido guardada.',
            noList:       'No se encontró ninguna lista. Activa las listas de lectura en Preferencias → Accesorios.',
            errConn:      'Error de conexión.',
            errSave:      'Error: ',
            btnTooltip:   'Guardar esta página en tus listas de lectura',
            btnTooltipOn: 'Eliminar esta página de tus listas de lectura'
        },
        'pt': {
            saved:        'Guardadas',
            tooltip:      'Ver as suas páginas guardadas',
            saving:       'A guardar…',
            removing:     'A remover…',
            success:      '✅ Página guardada! Encontra-a em «Guardadas».',
            removed:      '🗑️ Página removida das guardadas.',
            duplicate:    'Esta página já foi guardada.',
            noList:       'Nenhuma lista encontrada. Ativa as listas de leitura em Preferências → Ferramentas.',
            errConn:      'Erro de ligação.',
            errSave:      'Erro: ',
            btnTooltip:   'Guardar esta página nas tuas listas de leitura',
            btnTooltipOn: 'Remover esta página das tuas listas de leitura'
        },
        'zh': {
            saved:        '已保存',
            tooltip:      '前往您保存的页面',
            saving:       '正在保存…',
            removing:     '正在移除…',
            success:      '✅ 页面已保存！在"已保存"中查看。',
            removed:      '🗑️ 页面已从保存中移除。',
            duplicate:    '此页面已经保存过了。',
            noList:       '未找到列表。请在首选项 → 小工具中启用阅读列表。',
            errConn:      '连接错误。',
            errSave:      '错误：',
            btnTooltip:   '将此页面保存到您的阅读列表',
            btnTooltipOn: '从您的阅读列表中移除此页面'
        },
        'ru': {
            saved:        'Сохранённые',
            tooltip:      'Перейти к сохранённым страницам',
            saving:       'Сохранение…',
            removing:     'Удаление…',
            success:      '✅ Страница сохранена! Найдите её в разделе «Сохранённые».',
            removed:      '🗑️ Страница удалена из сохранённых.',
            duplicate:    'Эта страница уже была сохранена.',
            noList:       'Список не найден. Включите списки чтения в настройках → Гаджеты.',
            errConn:      'Ошибка соединения.',
            errSave:      'Ошибка: ',
            btnTooltip:   'Сохранить эту страницу в списки чтения',
            btnTooltipOn: 'Удалить эту страницу из списков чтения'
        },
        'ja': {
            saved:        '保存済み',
            tooltip:      '保存したページを見る',
            saving:       '保存中…',
            removing:     '削除中…',
            success:      '✅ 保存しました！「保存済み」から確認できます。',
            removed:      '🗑️ 保存済みから削除しました。',
            duplicate:    'このページはすでに保存されています。',
            noList:       'リストが見つかりません。設定 → ガジェットで読書リストを有効にしてください。',
            errConn:      '接続エラー。',
            errSave:      'エラー: ',
            btnTooltip:   'このページを読書リストに保存する',
            btnTooltipOn: 'このページを読書リストから削除する'
        },
        'ar': {
            saved:        'المحفوظات',
            tooltip:      'اذهب إلى صفحاتك المحفوظة',
            saving:       'جارٍ الحفظ…',
            removing:     'جارٍ الحذف…',
            success:      '✅ تم حفظ الصفحة! ستجدها في «المحفوظات».',
            removed:      '🗑️ تمت إزالة الصفحة من المحفوظات.',
            duplicate:    'هذه الصفحة محفوظة بالفعل.',
            noList:       'لم يتم العثور على قائمة. فعّل قوائم القراءة من التفضيلات ← الأدوات.',
            errConn:      'خطأ في الاتصال.',
            errSave:      'خطأ: ',
            btnTooltip:   'احفظ هذه الصفحة في قوائم قراءتك',
            btnTooltipOn: 'احذف هذه الصفحة من قوائم قراءتك'
        }
    };

    var t = i18n[langFull] || i18n[langBase] || i18n['en'];

    // ==========================================
    // SVG
    // ==========================================
    var svgEmpty  = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path d="M4 2v16l6-4.5L16 18V2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
    var svgFilled = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path d="M4 2v16l6-4.5L16 18V2z" fill="currentColor"/></svg>';

    // ==========================================
    // 1. LINK "SALVATE" NEL MENU PERSONALE
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
    // Solo su pagine reali (non pagine speciali)
    // ==========================================
    if (mw.config.get('wgNamespaceNumber') < 0) return;

    var bookmarkLink = mw.util.addPortletLink(
        'p-views', '#', '', 'ca-bookmark-icon', t.btnTooltip, null, null
    );
    if (!bookmarkLink) {
        bookmarkLink = mw.util.addPortletLink(
            'p-cactions', '#', '', 'ca-bookmark-icon', t.btnTooltip, null, null
        );
    }
    if (!bookmarkLink) return;

    var $link = $(bookmarkLink).find('a');
    $link.css({ display: 'flex', alignItems: 'center', padding: '0 8px' });
    $(bookmarkLink).css({ backgroundImage: 'none', listStyle: 'none' });

    var api          = new mw.Api();
    var projectUrl   = window.location.protocol + '//' + window.location.host;
    var pageTitle    = mw.config.get('wgPageName');
    var savedEntryId = null; // ID dell'entry se la pagina è già salvata

    // Funzioni per aggiornare l'aspetto del bottone
    function setEmpty() {
        $link.empty().append($(svgEmpty));
        $link.attr('title', t.btnTooltip);
        savedEntryId = null;
    }

    function setFilled(entryId) {
        $link.empty().append($(svgFilled));
        $link.attr('title', t.btnTooltipOn);
        savedEntryId = entryId || true;
    }

    // ==========================================
    // CONTROLLO INIZIALE
    // Verifica se la pagina è già salvata e
    // mostra subito l'icona corretta
    // ==========================================
    $link.empty().append($(svgEmpty)); // stato iniziale mentre carichiamo

    api.get({
        action: 'query',
        meta: 'readinglists',
        format: 'json'
    }).done(function (data) {
        var lists = data.query && data.query.readinglists;
        if (!lists || lists.length === 0) return;

        var defaultList = lists[0];
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].isdefault) { defaultList = lists[i]; break; }
        }

        // Cerca la pagina corrente nelle entry della lista
        api.get({
            action: 'query',
            list: 'readinglistentries',
            rlelists: defaultList.id,
            rlelimit: 500,
            format: 'json'
        }).done(function (data2) {
            var entries = data2.query && data2.query.readinglistentries;
            if (!entries) return;
            for (var j = 0; j < entries.length; j++) {
                if (entries[j].title === pageTitle && entries[j].project === projectUrl) {
                    setFilled(entries[j].id);
                    break;
                }
            }
        });
    });

    // ==========================================
    // CLICK: SALVA O RIMUOVI
    // ==========================================
    $link.on('click', function (e) {
        e.preventDefault();

        // Se la pagina è già salvata → rimuovila
        if (savedEntryId) {
            mw.notify(t.removing, { type: 'info' });
            api.postWithToken('csrf', {
                action: 'readinglists',
                command: 'deleteentry',
                entry: savedEntryId
            }).done(function () {
                setEmpty();
                mw.notify(t.removed, { type: 'success' });
            }).fail(function (code) {
                mw.notify(t.errSave + code, { type: 'error' });
            });
            return;
        }

        // Altrimenti → salvala
        setFilled();
        mw.notify(t.saving, { type: 'info' });

        api.get({
            action: 'query',
            meta: 'readinglists',
            format: 'json'
        }).done(function (data) {
            var lists = data.query && data.query.readinglists;

            if (!lists || lists.length === 0) {
                setEmpty();
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
                title: pageTitle
            }).done(function (result) {
                var newId = result.readinglists && result.readinglists.id;
                setFilled(newId);
                mw.notify(t.success, { type: 'success' });
            }).fail(function (code) {
                if (code === 'duplicate') {
                    mw.notify(t.duplicate, { type: 'info' });
                } else {
                    setEmpty();
                    mw.notify(t.errSave + code, { type: 'error' });
                }
            });

        }).fail(function () {
            setEmpty();
            mw.notify(t.errConn, { type: 'error' });
        });
    });

});
