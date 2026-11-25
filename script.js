(() => {
  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = !mobileMenu.hidden;
      mobileMenu.hidden = isOpen;
      burger.setAttribute('aria-expanded', String(!isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.hidden = true;
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Track tabs for pricing
  const tracks = {
    ege: {
      group: {
        price: '1 200 ₽',
        desc: 'Живой разбор 1-й и 2-й части ЕГЭ с учениками одного уровня. Два занятия в неделю.',
      },
      individual: {
        price: '2 200 ₽',
        desc: 'Персональный темп, упор на сложные задания 2-й части (параметры, стереометрия, экономика).',
      },
      intensive: {
        price: '14 900 ₽',
        desc: 'Системное повторение ключевых тем ЕГЭ, отработка оформления бланков и тайминга.',
      },
      goal: 'ЕГЭ Профиль (11 класс)',
    },
    oge: {
      group: {
        price: '1 000 ₽',
        desc: 'Понятный разбор алгебры и геометрии ОГЭ в группе до 4 человек. Два урока в неделю.',
      },
      individual: {
        price: '1 900 ₽',
        desc: 'Закрываем пробелы с 7–8 класса и уверенно выходим на «5» без стресса и перегруза.',
      },
      intensive: {
        price: '12 900 ₽',
        desc: 'Экспресс-повторение всех заданий ОГЭ, разбор реальных вариантов и частых ловушек.',
      },
      goal: 'ОГЭ (9 класс)',
    },
    school: {
      group: {
        price: '1 000 ₽',
        desc: 'Поддержка по школьной программе 8–10 классов: контрольные, алгебра и геометрия.',
      },
      individual: {
        price: '1 900 ₽',
        desc: 'Индивидуальное закрытие пробелов, помощь с домашками и подготовка к профильному классу.',
      },
      intensive: {
        price: '12 900 ₽',
        desc: 'Пакет из 8 уроков для быстрого выравнивания оценок перед четвертью или ВПР.',
      },
      goal: 'Школьная программа (8–10 кл.)',
    },
  };

  const tabs = document.querySelectorAll('.tab');
  const goalSelect = document.getElementById('goal');
  const planSelect = document.getElementById('plan');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.track;
      const data = tracks[key];
      if (!data) return;

      tabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });

      const labels = {
        group: `Мини-группа — ${data.group.price}`,
        individual: `Индивидуально — ${data.individual.price}`,
        intensive: `Интенсив (8 уроков) — ${data.intensive.price}`,
      };

      ['group', 'individual', 'intensive'].forEach((tier, idx) => {
        const priceEl = document.querySelector(`[data-track-price="${tier}"]`);
        const descEl = document.querySelector(`[data-track-desc="${tier}"]`);
        if (priceEl) priceEl.textContent = data[tier].price;
        if (descEl) descEl.textContent = data[tier].desc;
        const cardBtn = document.querySelectorAll('.select-plan')[idx];
        if (cardBtn) cardBtn.dataset.plan = labels[tier];
      });

      if (planSelect) {
        planSelect.options[0].value = labels.individual;
        planSelect.options[0].textContent = labels.individual;
        planSelect.options[1].value = labels.group;
        planSelect.options[1].textContent = labels.group;
        planSelect.options[2].value = labels.intensive;
        planSelect.options[2].textContent = `Интенсив — ${data.intensive.price}`;
      }

      if (goalSelect) {
        goalSelect.value = data.goal;
      }
    });
  });

  // Select plan button -> prefill booking form & scroll
  document.querySelectorAll('.select-plan').forEach((btn) => {
    btn.addEventListener('click', () => {
      const planValue = btn.dataset.plan;
      if (planSelect && planValue) {
        const match = Array.from(planSelect.options).find((o) =>
          o.value.startsWith(planValue.split('—')[0].trim())
        );
        if (match) planSelect.value = match.value;
      }
      const booking = document.getElementById('booking');
      if (booking) {
        booking.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          document.getElementById('name')?.focus();
        }, 450);
      }
    });
  });

  // Booking form handling
  const form = document.getElementById('booking-form');
  const errorBox = document.getElementById('form-error');
  const successBox = document.getElementById('form-success');
  const successText = document.getElementById('form-success-text');
  const resetBtn = document.getElementById('form-reset');

  if (form && errorBox && successBox && successText) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const contact = form.contact.value.trim();
      const goal = form.goal.value;
      const plan = form.plan.value;

      if (!name || !contact) {
        errorBox.textContent = 'Пожалуйста, укажите имя и контакт (Telegram или телефон).';
        errorBox.hidden = false;
        return;
      }

      errorBox.hidden = true;
      successText.textContent = `${name}, спасибо! Формат «${plan}» (${goal}) выбран. Анна свяжется с вами по контакту ${contact} в течение 15 минут.`;
      form.hidden = true;
      successBox.hidden = false;
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        form.hidden = false;
        successBox.hidden = true;
      });
    }
  }
})();
